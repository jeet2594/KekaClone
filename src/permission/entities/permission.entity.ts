import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g., 'holiday_create', 'holiday_update', ...

  // Other columns as needed
}
