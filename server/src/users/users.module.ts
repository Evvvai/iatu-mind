import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsValidPasswordConstraint } from '../auth/decorators/valid-password.decorator';
import { IsLoginExistConstraint } from '../auth/decorators/login-exists.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersResolver,
    UsersService,
    IsLoginExistConstraint,
    IsValidPasswordConstraint,
  ],
  exports: [UsersService],
})
export class UsersModule {}
