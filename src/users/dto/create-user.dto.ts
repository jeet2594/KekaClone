import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsNotEmptyArray } from 'src/validations/custom-validators';
import { isUnique } from 'src/validations/uniquefield.decorator';

export class CreateUserDto {
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

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmptyArray()
  readonly roles: number[];

  @IsNotEmpty()
  @IsEmail()
  @isUnique({ tableName: 'users', column: 'email'})
  readonly email: string;
  // Other properties and validation rules
}
