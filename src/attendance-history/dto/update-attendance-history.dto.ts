import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceHistoryDto } from './create-attendance-history.dto';

export class UpdateAttendanceHistoryDto extends PartialType(CreateAttendanceHistoryDto) {}
