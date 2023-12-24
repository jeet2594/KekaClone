import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { IsUniqeInterface } from './uniquefield.decorator';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    // catch options from decorator
    // const { tableName, column }: IsUniqeInterface = args.constraints[0];
    // const { tableName, column, excludeId }: IsUniqeInterface =
    //   args.constraints[0];
    //   console.log('this is the id',excludeId);
    const { tableName, column}: IsUniqeInterface =
      args.constraints[0];
      

    const queryBuilder = this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName);

    queryBuilder.where({ [column]: value });

    // if (excludeId !== null) {
    //   // Exclude the record with the provided ID from the uniqueness check
    //   queryBuilder.andWhere(`${tableName}.id != :excludeId`, { excludeId });
    // }
    const dataExist = await queryBuilder.getExists();

    // database query check data is exists
    // const dataExist = await this.entityManager
    //   .getRepository(tableName)
    //   .createQueryBuilder(tableName)
    //   .where({ [column]: value })
    //   .getExists();

    return !dataExist;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    // return custom field message
    const field: string = validationArguments.property;
    return `${field} is already exist`;
  }
}
