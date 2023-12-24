import { AttendanceHistory } from 'src/attendance-history/entities/attendance-history.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_attendance' })
export class UserAttendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: number;

  @Column({ type: 'date' })
  date: string;

  @OneToMany(() => AttendanceHistory, (history) => history.userAttendance)
  attendanceHistory: AttendanceHistory[];
}
