import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthHelper } from './utils/auth.helper';
import { UserToken } from './entities/user-token';
import { UsersService } from '../users/users.service';
import { Role } from '../users/entities/role.enum';

import { JwtDto } from './dto/jwt.dto';
import { AuthSignInInput } from './dto/auth-signin.input';
import { AuthSignUpInput } from './dto/auth-signup.input';
import { AuthInput } from './dto/auth.input';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private usersService: UsersService,
  ) {}

  public async signIn(input: AuthSignInInput): Promise<UserToken> {
    const found = await this.usersService.findUserByLogin(input.login);

    return { user: found, token: this.signToken(found.id, found.role) };
  }

  public async signUp(input: AuthSignUpInput): Promise<UserToken> {
    input.password = await AuthHelper.hash(input.password);
    const created = await this.usersService.createUser(input);

    return {
      token: this.signToken(created.id, created.role),
      user: created,
    };
  }

  public async auth(user: User): Promise<UserToken> {
    return { user, token: this.signToken(user.id, user.role) };
  }

  private signToken(userId: number, role: Role) {
    const payload: JwtDto = { userId, role };

    return this.jwt.sign(payload);
  }

  public async validateUser(userId: number) {
    return this.usersService.findUserById(userId);
  }
}
