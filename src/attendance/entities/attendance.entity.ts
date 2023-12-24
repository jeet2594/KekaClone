import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  check_in_time: Date;

  @Column({ nullable: true })
  check_out_time: Date;
}
