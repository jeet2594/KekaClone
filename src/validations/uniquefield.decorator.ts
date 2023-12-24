import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsUniqueConstraint } from './uniquefield.pipe';

// decorator options interface
export type IsUniqeInterface = {
  tableName: string;
  column: string;
  // excludeId?: number | null;
};

// decorator function
export function isUnique(
  options: IsUniqeInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
