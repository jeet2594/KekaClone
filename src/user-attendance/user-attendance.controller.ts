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
import { UserAttendanceService } from './user-attendance.service';
import { UpdateUserAttendanceDto } from './dto/update-user-attendance.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AttendanceHistoryService } from 'src/attendance-history/attendance-history.service';

@Controller('user-attendance')
export class UserAttendanceController {
  constructor(
    private readonly userAttendanceService: UserAttendanceService,
    private readonly attendanceHistoryRepository: AttendanceHistoryService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('check-in')
  async create(@Request() req) {
    try {
      const attendanceId = await this.userAttendanceService.getAttendanceId(
        req.user.user.id,
        new Date(),
      );
      await this.attendanceHistoryRepository.checkIn(attendanceId);
      return { status: true, message: 'Success' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Post('check-out')
  async checkOut(@Request() req) {
    try {
      const attendanceId = await this.userAttendanceService.getAttendanceId(
        req.user.user.id,
        new Date(),
      );
      await this.attendanceHistoryRepository.checkOut(attendanceId);
      return { status: true, message: 'Successd' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get('isClockIn')
  async isClockIn(@Request() req) {
    try {
      const date = new Date();
      const userAttendance = await this.userAttendanceService.findByUserAndDate(
        req.user.user.id,
        date,
      );
      const isClockIn =
        userAttendance.attendanceHistory.length > 0 &&
        userAttendance.attendanceHistory[0].check_out_time === null
          ? true
          : false;
      // eslint-disable-next-line prettier/prettier
      return {
        status: true,
        message: 'success',
        isClockIn,
      };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get('attendance-list/:month/:year')
  async getAttendanceList(
    @Param('month') month: any,
    @Param('year') year: any,
    @Request() req,
  ) {
    try {
      const attendance =
        await this.userAttendanceService.getUserAttendanceHistoryForMonth(
          req.user.user.id,
          year,
          month,
        );
      return { status: true, message: 'success', attendance };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Get()
  findAll() {
    return this.userAttendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAttendanceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAttendanceDto: UpdateUserAttendanceDto,
  ) {
    return this.userAttendanceService.update(+id, updateUserAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAttendanceService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Post('new')
  async test(@Request() req) {
    return await this.userAttendanceService.findByUserAndDate(
      req.user.user.id,
      new Date(),
    );
  }
}
