import { UserAttendance } from 'src/user-attendance/entities/user-attendance.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'attendance_history' })
export class AttendanceHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => UserAttendance,
    (userAttendance) => userAttendance.attendanceHistory,
  )
  @JoinColumn({ name: 'attendance_id' })
  userAttendance: UserAttendance;

  // @CreateDateColumn({ type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  // check_in_time: Date;

  // @CreateDateColumn({ type: 'time', nullable: true, default: () => 'NULL' })
  // check_out_time: Date;

  @Column({ type: 'time', default: () => 'CURRENT_TIMESTAMP' })
  check_in_time: string;

  @Column({ type: 'time', nullable: true, default: null })
  check_out_time: string;
}
