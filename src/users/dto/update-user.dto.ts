import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsNotEmptyArray } from 'src/validations/custom-validators';
import { isUnique } from 'src/validations/uniquefield.decorator';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly lastname: string;

  @IsNotEmpty()
  readonly dob: string;

  // @IsNotEmpty()
  readonly lastdate: string;

  @IsNotEmpty()
  readonly joindate: string;

  @IsNotEmptyArray()
  readonly roles: number[];

  // @IsNotEmpty()
  // @IsEmail()
  // // @isUnique({ tableName: 'users', column: 'email', excludeId: null })
  // @isUnique({ tableName: 'users', column: 'email' })
  // readonly email: string;
  // Other properties and validation rules

// Setter method for excludeId
  setExcludeId(excludeId: number | null) {
    this.excludeId = excludeId;
  }

  // Initialize excludeId as null by default
  private excludeId: number | null = null;
}
