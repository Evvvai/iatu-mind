import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsLoginExist } from '../decorators/login-exists.decorator';
import { Match } from '../decorators/match.decorator';

@InputType()
export class AuthSignUpInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  lastName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(4)
  @IsLoginExist(false)
  login: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(4)
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(4)
  @Match('password')
  rePassword: string;
}
