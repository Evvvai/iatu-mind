import { JWT_SECRET } from '@environments';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { IsLoginExistConstraint } from './decorators/login-exists.decorator';
import { IsValidPasswordConstraint } from './decorators/valid-password.decorator';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: JWT_SECRET,
      }),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    IsLoginExistConstraint,
    IsValidPasswordConstraint,
  ],
  exports: [],
})
export class AuthModule {}
