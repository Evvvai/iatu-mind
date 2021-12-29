import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../../users/users.service';

export function IsLoginExist(
  property: boolean,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsLoginExist',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsLoginExistConstraint,
    });
  };
}

@ValidatorConstraint()
@Injectable()
export class IsLoginExistConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly usersService: UsersService) {}

  async validate(value: string, args: ValidationArguments) {
    const found = await this.usersService.findUserByLogin(value);

    const [type] = args.constraints;

    if (type) {
      if (!found) return false;
    } else {
      if (found) return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [type] = args.constraints;

    if (type) {
      return `${args.value} Not found`;
    } else {
      return `${args.value} Login already used`;
    }
  }
}
