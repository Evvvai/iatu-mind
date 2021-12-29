import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/input/create-user.input';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './entities/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN, Role.PREMIUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [User])
  users(@CtxUser() user: User): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Query(() => User)
  findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }
}
