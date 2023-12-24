import { Module } from '@nestjs/common';
import { UserAttendanceService } from './user-attendance.service';
import { UserAttendanceController } from './user-attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAttendance } from './entities/user-attendance.entity';
import { jwtConstants } from 'src/auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { AttendanceHistoryModule } from 'src/attendance-history/attendance-history.module';
import { AttendanceHistoryService } from 'src/attendance-history/attendance-history.service';
import { AttendanceHistory } from 'src/attendance-history/entities/attendance-history.entity';
import { HolidayModule } from 'src/holiday/holiday.module';
import { HolidayService } from 'src/holiday/holiday.service';
import { Holiday } from 'src/holiday/entities/holiday.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAttendance]),
    TypeOrmModule.forFeature([AttendanceHistory]),
    TypeOrmModule.forFeature([Holiday]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    AttendanceHistoryModule,
    HolidayModule,
  ],
  controllers: [UserAttendanceController],
  providers: [UserAttendanceService, AttendanceHistoryService, HolidayService],
})
export class UserAttendanceModule {}
