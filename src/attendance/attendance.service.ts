import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  create(createAttendanceDto: CreateAttendanceDto) {
    return 'This action adds a new attendance';
  }

  findAll() {
    return `This action returns all attendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }

  async checkIn(userId: string) {
    // Check if the user is already checked in
    console.log('check is user is ', userId);

    const existingRecord = await this.attendanceRepository.findOne({
      where: { check_out_time: IsNull(), user_id: userId },
    });
    // const existingRecord = await this.attendanceRepository
    //   .createQueryBuilder('attendance')
    //   .where('attendance.user_id', { userId })
    //   .andWhere('attendance.check_out_time IS NULL')
    //   .getOne();
    console.log(
      this.attendanceRepository
        .createQueryBuilder()
        .where('user_id', { userId })
        .andWhere('check_in_time IS NULL')
        .getSql(),
    );

    console.log('existingRecord', existingRecord);

    if (existingRecord) {
      return 'User is already checked in.';
    }

    // Record check-in time
    // const checkInTime = new Date();
    return await this.attendanceRepository.insert({
      user_id: userId,
      check_in_time: new Date(),
    });
  }

  async isClockIn(userId: string) {
    const latestRecord = await this.attendanceRepository.findOne({
      where: { user_id: userId, check_out_time: null },
      order: { check_in_time: 'DESC' },
    });
    if (!latestRecord) {
      return false;
    } else {
      return true;
    }
  }

  async checkOut(userId: string) {
    // Find the latest check-in record for the user
    const latestRecord = await this.attendanceRepository.findOne({
      where: { user_id: userId, check_out_time: null },
      order: { check_in_time: 'DESC' },
    });

    if (!latestRecord) {
      return 'User has not checked in.';
    }

    // Record check-out time
    // const checkOutTime = new Date();
    return await this.attendanceRepository.update(latestRecord.id, {
      check_out_time: new Date(),
    });

    // return 'Check-out successful.';
  }

  // async getByMonth(userId: number, month: Date) {
  //   const currentDate = new Date(); // Replace with the actual date

  //   const firstDayOfMonth = startOfMonth(currentDate);
  //   const lastDayOfMonth = endOfMonth(currentDate);
  //   const allDaysOfMonth = eachDayOfInterval({
  //     start: firstDayOfMonth,
  //     end: lastDayOfMonth,
  //   });

  //   const attendanceData = await this.attendanceRepository
  //     .createQueryBuilder('attendance')
  //     .select([
  //       'attendance.id',
  //       'attendance.user_id',
  //       'attendance.check_in_time',
  //       'attendance.check_out_time',
  //       'COALESCE(SUM(TIMESTAMPDIFF(SECOND, attendance.check_in_time, attendance.check_out_time) / 3600), 0) AS totalHours',
  //       // 'COALESCE(SUM(ABS(EXTRACT(EPOCH FROM (attendance.check_out_time - attendance.check_in_time)) / 3600)), 0) AS totalHours',
  //       'holiday.date AS isHoliday'
  //     ])
  //     .leftJoin(
  //       'Holiday',
  //       'holiday',
  //       'holiday.date = attendance.check_in_time',
  //     )
  //     .where('attendance.user_id', { userId })
  //     .andWhere('attendance.check_in_time >= :firstDayOfMonth', { firstDayOfMonth })
  //     .andWhere('attendance.check_in_time <= :lastDayOfMonth', {
  //       lastDayOfMonth
  //     })
  //     .groupBy(
  //       'attendance.id, attendance.check_in_time, attendance.check_out_time, holiday.date'
  //     )
  //     .getRawMany();

  //     const result = allDaysOfMonth.map((day) => {
  //       const formattedDay = format(day, 'yyyy-MM-dd');
  //       const dayData = attendanceData.find((data) => data.date === formattedDay);
  //     return (
  //       dayData || { date: formattedDay, totalHours: null, isHoliday: null })
  //     });
  //     console.log(result);

  //   console.log(attendanceData);
  // }

  async getByMonth(userId: number, month: Date) {
    const date = new Date();
    const attendance = await this.attendanceRepository.
    createQueryBuilder('attendance')
    .select(['attendance.id','attendance.user_id','attendance.check_in_time'])
    .where('attendance.check_in_time', {  date })
    .groupBy('')
    .getMany();

    return attendance;
  }
}
