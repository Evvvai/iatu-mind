import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { CtxUser } from './decorators/ctx-user.decorator';
import { AuthSignInInput } from './dto/auth-signin.input';
import { AuthSignUpInput } from './dto/auth-signup.input';
import { UserToken } from './entities/user-token';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Mutation(() => UserToken)
  signIn(
    @Args({ name: 'input', type: () => AuthSignInInput })
    input: AuthSignInInput,
  ) {
    return this.service.signIn(input);
  }

  @Mutation(() => UserToken)
  signUp(
    @Args({ name: 'input', type: () => AuthSignUpInput })
    input: AuthSignUpInput,
  ) {
    return this.service.signUp(input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserToken)
  auth(@CtxUser() user: User) {
    return this.service.auth(user);
  }
}
