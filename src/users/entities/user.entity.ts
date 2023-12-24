import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ type: 'date' })
  dob: string;

  @Column({ type: 'date' })
  joindate: string;

  @Column({ type: 'date', nullable: true })
  lastdate: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  // @DeleteDateColumn()
  // deleted_at: Date; // Deletion date
  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;

  @ManyToMany(() => Role, { eager: true }) // Define Many-to-Many relationship with Role entity
  @JoinTable() // Name of the junction table will be auto-generated
  roles: Role[];
}
