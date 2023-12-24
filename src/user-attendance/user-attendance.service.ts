import { Injectable } from '@nestjs/common';
import { CreateUserAttendanceDto } from './dto/create-user-attendance.dto';
import { UpdateUserAttendanceDto } from './dto/update-user-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAttendance } from './entities/user-attendance.entity';
import { Between, Repository } from 'typeorm';
import { AttendanceHistoryService } from 'src/attendance-history/attendance-history.service';
import { HolidayService } from 'src/holiday/holiday.service';

@Injectable()
export class UserAttendanceService {
  constructor(
    @InjectRepository(UserAttendance)
    private userAttendaceRepository: Repository<UserAttendance>,
    private attendanceHistoryRepository: AttendanceHistoryService,
    private holidayRepository: HolidayService,
  ) {}

  async create(createUserAttendanceDto: CreateUserAttendanceDto, userId: any) {
    try {
      const { date } = createUserAttendanceDto;
      const attendance = this.userAttendaceRepository.create({
        user_id: userId,
        date: date,
      });
      const newAttendance = await this.userAttendaceRepository.save(attendance);
      return newAttendance;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAttendanceId(userId: number, date: any) {
    try {
      const searchDate = this.formatDate(date);
      const awailableEntry = await this.findByUserAndDate(userId, searchDate);
      let attendanceId: string = '';
      if (awailableEntry) {
        attendanceId = awailableEntry.id;
      } else {
        const newAttendance = await this.create({ date: searchDate }, userId);
        attendanceId = newAttendance.id;
      }
      return attendanceId;
      // return await this.attendanceHistoryRepository.checkIn(attendanceId);
      // return attendanceId;
    } catch (error) {
      throw new Error(error);
    }
  }

  isClockIn(userId: number) {
    try {
    } catch (error) {}
  }

  findAll() {
    return `This action returns all userAttendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAttendance`;
  }

  async findByUserAndDate(id: number, date: any) {
    const newDate = this.formatDate(date);
    return await this.userAttendaceRepository.findOne({
      where: { user_id: id, date: newDate },
      relations: ['attendanceHistory'],
      order: {
        attendanceHistory: {
          check_in_time: 'DESC',
        },
      },
    });
  }

  // async getUserAttendanceHistoryForMonth(
  //   userId: number,
  //   year: number,
  //   month: number,
  // ) {
  //   const startDate = new Date(year, month - 1, 1);
  //   const endDate = new Date(year, month, 0);

  //   const userAttendance = await this.userAttendaceRepository.findOne({
  //     where: { user_id: userId },
  //     relations: ['attendanceHistory'],
  //   });

  //   if (!userAttendance) {
  //     return null;
  //   }
  //   console.log(
  //     '=== userAttendance.attendanceHistory',
  //     userAttendance.attendanceHistory,
  //   );
  //   console.log(
  //     `=== startDate.toISOString().split('T')[0]`,
  //     startDate.toISOString().split('T')[0],
  //   );

  //   const attendanceHistoryForMonth = userAttendance.attendanceHistory.filter(
  //     (entry: any) =>
  //       entry.date >= startDate.toISOString().split('T')[0] &&
  //       entry.date <= endDate.toISOString().split('T')[0],
  //   );
  //   console.log('=== attendanceHistoryForMonth', attendanceHistoryForMonth);

  //   const daysInMonth = Array.from(
  //     { length: endDate.getDate() },
  //     (_, index) => index + 1,
  //   );

  //   const attendanceListForMonth = daysInMonth.map((day) => {
  //     const currentDate = new Date(year, month - 1, day);
  //     const formattedDate = currentDate.toISOString().split('T')[0];

  //     const dailyAttendanceEntries = attendanceHistoryForMonth.filter(
  //       (entry: any) => entry.date === formattedDate,
  //     );

  //     const totalAttendanceTime = dailyAttendanceEntries.reduce(
  //       (total, entry) => {
  //         const checkInTime = new Date(`1970-01-01T${entry.check_in_time}`);
  //         const checkOutTime = new Date(`1970-01-01T${entry.check_out_time}`);
  //         const attendanceTime = checkOutTime.getTime() - checkInTime.getTime();
  //         return total + attendanceTime;
  //       },
  //       0,
  //     );

  //     const totalAttendanceHours = Math.floor(
  //       totalAttendanceTime / (60 * 60 * 1000),
  //     );
  //     const totalAttendanceMinutes = Math.floor(
  //       (totalAttendanceTime % (60 * 60 * 1000)) / (60 * 1000),
  //     );

  //     const isAbsent = dailyAttendanceEntries.length === 0;

  //     const isHoliday = true;

  //     return {
  //       date: formattedDate,
  //       isAbsent,
  //       isHoliday,
  //       totalAttendance: `${totalAttendanceHours}:${totalAttendanceMinutes}`,
  //       attendanceEntries: dailyAttendanceEntries,
  //     };
  //   });

  //   return {
  //     userAttendance,
  //     attendanceListForMonth,
  //   };
  // }

  // async getUserAttendanceHistoryForMonth(
  //   userId: number,
  //   year: number,
  //   month: number,
  // ) {
  //   const startDate = new Date(year, month - 1, 1);
  //   const endDate = new Date(year, month, 0);

  //   const userAttendance = await this.userAttendaceRepository.find({
  //     where: { user_id: userId },
  //     relations: ['attendanceHistory'],
  //   });

  //   if (!userAttendance) {
  //     return null;
  //   }
  //   console.log('=== userAttendance.attendanceHistory', userAttendance);
  //   console.log(
  //     `=== startDate.toISOString().split('T')[0]`,
  //     startDate.toISOString().split('T')[0],
  //   );

  //   const attendanceHistoryForMonth = userAttendance.filter(
  //     (entry: any) =>
  //       entry.date >= startDate.toISOString().split('T')[0] &&
  //       entry.date <= endDate.toISOString().split('T')[0],
  //   );
  //   console.log('=== attendanceHistoryForMonth', attendanceHistoryForMonth);

  //   const daysInMonth = Array.from(
  //     { length: endDate.getDate() },
  //     (_, index) => index + 1,
  //   );

  //   const attendanceListForMonth = daysInMonth.map((day) => {
  //     const currentDate = new Date(year, month - 1, day);
  //     const formattedDate = currentDate.toISOString().split('T')[0];

  //     const dailyAttendanceEntries = attendanceHistoryForMonth.filter(
  //       (entry: any) => entry.date === formattedDate,
  //     );

  //     console.log('dailyAttendanceEntries', dailyAttendanceEntries);

  //     const totalAttendanceTime = dailyAttendanceEntries.reduce(
  //       (total, entry) => {
  //         const checkInTime = new Date(`1970-01-01T${entry.check_in_time}`);
  //         const checkOutTime = new Date(`1970-01-01T${entry.check_out_time}`);
  //         const attendanceTime = checkOutTime.getTime() - checkInTime.getTime();
  //         return total + attendanceTime;
  //       },
  //       0,
  //     );

  //     const totalAttendanceHours = Math.floor(
  //       totalAttendanceTime / (60 * 60 * 1000),
  //     );
  //     const totalAttendanceMinutes = Math.floor(
  //       (totalAttendanceTime % (60 * 60 * 1000)) / (60 * 1000),
  //     );

  //     const isAbsent = dailyAttendanceEntries.length === 0;

  //     const isHoliday = true;

  //     return {
  //       date: formattedDate,
  //       isAbsent,
  //       isHoliday,
  //       totalAttendance: `${totalAttendanceHours}:${totalAttendanceMinutes}`,
  //       attendanceEntries: dailyAttendanceEntries,
  //     };
  //   });

  //   return {
  //     userAttendance,
  //     attendanceListForMonth,
  //   };
  // }

  // async getUserAttendanceHistoryForMonth(
  //   userId: number,
  //   year: number,
  //   month: number,
  // ) {
  //   const startDate = new Date(year, month - 1, 1);
  //   const endDate = new Date(year, month, 0);

  //   const userAttendanceList = await this.userAttendaceRepository.find({
  //     where: {
  //       user_id: userId,
  //       date: Between(
  //         startDate.toISOString().split('T')[0],
  //         endDate.toISOString().split('T')[0],
  //       ),
  //     },
  //     relations: ['attendanceHistory'],
  //   });

  //   if (!userAttendanceList || userAttendanceList.length === 0) {
  //     return null;
  //   }

  //   const attendanceListForMonth = Array.from(
  //     { length: endDate.getDate() },
  //     (_, index) => {
  //       const day = index + 1;
  //       const currentDate = new Date(year, month - 1, day);
  //       const formattedDate = currentDate.toISOString().split('T')[0];

  //       // Find userAttendance entries for the current date
  //       const userAttendanceEntries = userAttendanceList.filter(
  //         (entry: any) => entry.date === formattedDate,
  //       );

  //       const totalAttendanceTime = userAttendanceEntries.reduce(
  //         (total, entry) => {
  //           // Assuming each userAttendance entry has a corresponding attendanceHistory entry
  //           const attendanceHistoryEntry = entry.attendanceHistory[0];
  //           if (
  //             attendanceHistoryEntry &&
  //             attendanceHistoryEntry.check_out_time
  //           ) {
  //             const checkInTime = new Date(
  //               `1970-01-01T${attendanceHistoryEntry.check_in_time}`,
  //             );
  //             const checkOutTime = new Date(
  //               `1970-01-01T${attendanceHistoryEntry.check_out_time}`,
  //             );
  //             const attendanceTime =
  //               checkOutTime.getTime() - checkInTime.getTime();
  //             return total + attendanceTime;
  //           }
  //           return total;
  //         },
  //         0,
  //       );

  //       const totalAttendanceHours = Math.floor(
  //         totalAttendanceTime / (60 * 60 * 1000),
  //       );
  //       const totalAttendanceMinutes = Math.floor(
  //         (totalAttendanceTime % (60 * 60 * 1000)) / (60 * 1000),
  //       );

  //       const isAbsent = userAttendanceEntries.length === 0;

  //       const isHoliday = true; // You can implement logic to determine holidays

  //       return {
  //         date: formattedDate,
  //         isAbsent,
  //         isHoliday,
  //         totalAttendance: `${totalAttendanceHours}:${totalAttendanceMinutes}`,
  //         attendanceEntries: userAttendanceEntries,
  //       };
  //     },
  //   );

  //   return {
  //     attendanceListForMonth,
  //   };
  // }

  async getUserAttendanceHistoryForMonth(
    userId: number,
    year: number,
    month: number,
  ) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    console.log('=== startDate is ', startDate);
    console.log('=== endDate is ', endDate);
    const holidays = await this.holidayRepository.findByStartEnd(
      startDate.toISOString().split('T')[0],
      endDate.toISOString().split('T')[0],
    );
    const holidayDates = holidays.map((holiday) => holiday.date);
    const userAttendanceList = await this.userAttendaceRepository.find({
      where: {
        user_id: userId,
        date: Between(
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
        ),
      },
      relations: ['attendanceHistory'],
    });

    // if (!userAttendanceList || userAttendanceList.length === 0) {
    //   return null;
    // }

    const attendanceListForMonth = Array.from(
      { length: endDate.getDate() },
      (_, index) => {
        const day = index + 1;
        const currentDate = new Date(year, month - 1, day);
        const formattedDate = currentDate.toISOString().split('T')[0];

        // Find userAttendance entries for the current date
        const userAttendanceEntry = userAttendanceList.find(
          (entry: any) => entry.date === formattedDate,
        );

        let totalAttendanceTime = 0;

        if (userAttendanceEntry) {
          // Assuming each userAttendance entry has a corresponding attendanceHistory entry
          const attendanceHistoryEntries =
            userAttendanceEntry.attendanceHistory || [];
          console.log('=== attendanceHistoryEntries', attendanceHistoryEntries);

          totalAttendanceTime = attendanceHistoryEntries.reduce(
            (total, entry) => {
              if (entry && entry.check_out_time) {
                const checkInTime = new Date(
                  `1970-01-01T${entry.check_in_time}`,
                );
                const checkOutTime = new Date(
                  `1970-01-01T${entry.check_out_time}`,
                );
                return total + (checkOutTime.getTime() - checkInTime.getTime());
              }
              return total;
            },
            0,
          );
        }

        const totalAttendanceHours = Math.floor(
          totalAttendanceTime / (60 * 60 * 1000),
        );
        const totalAttendanceMinutes = Math.floor(
          (totalAttendanceTime % (60 * 60 * 1000)) / (60 * 1000),
        );

        const isAbsent =
          !userAttendanceEntry ||
          !userAttendanceEntry.attendanceHistory ||
          userAttendanceEntry.attendanceHistory.length === 0;

        const isHoliday = holidayDates.includes(formattedDate); // You can implement logic to determine holidays

        const formattedTotalAttendance = `${totalAttendanceHours}:${totalAttendanceMinutes
          .toString()
          .padStart(2, '0')}`;
        const isShortAttendance = totalAttendanceTime < 8 * 60 * 60 * 1000; // Check if less than 8 hours

        return {
          date: formattedDate,
          isAbsent,
          isHoliday,
          isShortAttendance,
          totalAttendance: formattedTotalAttendance,
          attendanceEntries: userAttendanceEntry
            ? userAttendanceEntry.attendanceHistory
            : [],
        };
      },
    );

    return {
      attendanceListForMonth,
    };
  }

  update(id: number, updateUserAttendanceDto: UpdateUserAttendanceDto) {
    return `This action updates a #${id} userAttendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAttendance`;
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
