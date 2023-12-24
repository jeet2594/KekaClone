import { IsNotEmpty } from 'class-validator';

export class CreateUserAttendanceDto {
  @IsNotEmpty()
  readonly date: string;
}
