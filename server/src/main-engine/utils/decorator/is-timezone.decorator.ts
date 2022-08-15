import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as momentTimeZone from 'moment-timezone';

export function IsTimeZone(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsTimeZoneConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsTimeZone' })
export class IsTimeZoneConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return momentTimeZone.tz.zone(value) != null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    return `Unknown Time Zone`;
  }
}
