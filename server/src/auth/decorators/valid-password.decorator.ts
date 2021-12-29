import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../../users/users.service';
import { AuthHelper } from '../utils/auth.helper';

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsValidPassword',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsValidPasswordConstraint,
    });
  };
}

@ValidatorConstraint()
@Injectable()
export class IsValidPasswordConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly usersService: UsersService) {}

  async validate(value: string, args: ValidationArguments) {
    const login = (args.object as any)['login'];
    const found = await this.usersService.findUserByLogin(login);
    if (!found) return;

    const passwordValid = await AuthHelper.validate(value, found.password);

    if (!passwordValid) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid password`;
  }
}
