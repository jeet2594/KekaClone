import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAttendanceDto } from './create-user-attendance.dto';

export class UpdateUserAttendanceDto extends PartialType(CreateUserAttendanceDto) {}
