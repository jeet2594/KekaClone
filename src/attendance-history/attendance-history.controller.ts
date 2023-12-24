import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendanceHistoryService } from './attendance-history.service';
import { CreateAttendanceHistoryDto } from './dto/create-attendance-history.dto';
import { UpdateAttendanceHistoryDto } from './dto/update-attendance-history.dto';

@Controller('attendance-history')
export class AttendanceHistoryController {
  constructor(private readonly attendanceHistoryService: AttendanceHistoryService) {}

  @Post()
  create(@Body() createAttendanceHistoryDto: CreateAttendanceHistoryDto) {
    return this.attendanceHistoryService.create(createAttendanceHistoryDto);
  }

  @Get()
  findAll() {
    return this.attendanceHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceHistoryDto: UpdateAttendanceHistoryDto) {
    return this.attendanceHistoryService.update(+id, updateAttendanceHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceHistoryService.remove(+id);
  }
}
