import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotEmptyArray', async: false })
export class IsNotEmptyArrayConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return false;
  }

  defaultMessage() {
    return 'roles should not be an empty array';
  }
}

export function IsNotEmptyArray(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotEmptyArrayConstraint,
    });
  };
}
