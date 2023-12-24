import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Holiday } from './../holiday/entities/holiday.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { UserAttendance } from 'src/user-attendance/entities/user-attendance.entity';
import { AttendanceHistory } from 'src/attendance-history/entities/attendance-history.entity';
const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nest',
  entities: [
    Holiday,
    User,
    Role,
    Permission,
    Attendance,
    UserAttendance,
    AttendanceHistory,
  ],
  synchronize: true,
};

export default databaseConfig;
