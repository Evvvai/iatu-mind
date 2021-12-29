import { Field, InputType } from '@nestjs/graphql';
import { IsLoginExist } from '../decorators/login-exists.decorator';
import { IsValidPassword } from '../decorators/valid-password.decorator';

@InputType()
export class AuthSignInInput {
  @Field()
  @IsLoginExist(true)
  login: string;

  @Field()
  @IsValidPassword()
  password: string;
}
