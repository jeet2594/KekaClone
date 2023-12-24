import { Module } from '@nestjs/common';
import { AttendanceHistoryService } from './attendance-history.service';
import { AttendanceHistoryController } from './attendance-history.controller';
import { AttendanceHistory } from './entities/attendance-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceHistory])],
  controllers: [AttendanceHistoryController],
  providers: [AttendanceHistoryService],
  exports: [AttendanceHistoryService],
})
export class AttendanceHistoryModule {}
