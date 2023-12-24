import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('isClockIn')
  async isClockIn(@Request() req) {
    try {
      const status = await this.attendanceService.isClockIn(req.user.user.id);
      return { status: true, isClockIn: status };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Post('clock-in')
  async checkIn(@Request() req) {
    try {
      const clockIn = await this.attendanceService.checkIn(req.user.user.id);
      console.log('clockIn', clockIn);

      return { status: true, message: 'Clock In' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Post('clock-out')
  async checkOut(@Request() req) {
    try {
      await this.attendanceService.checkOut(req.user.user.id);
      return { status: true, message: 'Clock In' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Post('attendance-history')
  async getByMonth(@Request() req) {
    try {
      const history = await this.attendanceService.getByMonth(
        req.user.user.id,
        new Date(),
      );
      return { status: true, message: 'Success', history };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}
