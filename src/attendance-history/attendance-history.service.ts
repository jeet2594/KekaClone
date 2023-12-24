import { Injectable } from '@nestjs/common';
import { CreateAttendanceHistoryDto } from './dto/create-attendance-history.dto';
import { UpdateAttendanceHistoryDto } from './dto/update-attendance-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceHistory } from './entities/attendance-history.entity';
import { IsNull, Repository } from 'typeorm';
import { format } from 'date-fns';

@Injectable()
export class AttendanceHistoryService {
  constructor(
    @InjectRepository(AttendanceHistory)
    private attendanceHistoryRepository: Repository<AttendanceHistory>,
  ) {}
  create(createAttendanceHistoryDto: CreateAttendanceHistoryDto) {
    return 'This action adds a new attendanceHistory';
  }

  findAll() {
    return `This action returns all attendanceHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attendanceHistory`;
  }

  update(id: number, updateAttendanceHistoryDto: UpdateAttendanceHistoryDto) {
    return `This action updates a #${id} attendanceHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendanceHistory`;
  }

  async checkIn(attendanceId: any) {
    console.log('check is user is ', attendanceId);

    const existingRecord = await this.attendanceHistoryRepository.findOne({
      // where: { check_out_time: IsNull(), userAttendance: attendanceId },
      where: { check_out_time: IsNull(), userAttendance: { id: attendanceId } },
    });

    if (existingRecord) {
      throw new Error(`User is already checked in.`);
    }

    // Record check-in time
    // const checkInTime = new Date();
    return await this.attendanceHistoryRepository.insert({
      userAttendance: attendanceId,
      check_in_time: format(new Date(), 'HH:mm:ss'),
    });
  }

  async checkOut(attendanceId: string) {
    // Find the latest check-in record for the user
    const latestRecord = await this.attendanceHistoryRepository.findOne({
      where: { userAttendance: { id: attendanceId }, check_out_time: IsNull() },
      order: { check_in_time: 'DESC' },
    });

    if (!latestRecord) {
      throw new Error(`User has not checked in.`);
      // return 'User has not checked in.';
    }

    // Record check-out time
    // const checkOutTime = new Date();
    return await this.attendanceHistoryRepository.update(latestRecord.id, {
      check_out_time: format(new Date(), 'HH:mm:ss'),
    });

    // return 'Check-out successful.';
  }
}
