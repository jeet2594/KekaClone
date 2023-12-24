import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UploadService } from './upload/upload.service';
import dbConfig from './config/dbconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HolidayModule } from './holiday/holiday.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { APP_PIPE } from '@nestjs/core';
import { PermissionModule } from './permission/permission.module';
import { IsUniqueConstraint } from './validations/uniquefield.pipe';
import { AttendanceModule } from './attendance/attendance.module';
import { UserAttendanceModule } from './user-attendance/user-attendance.module';
import { AttendanceHistoryModule } from './attendance-history/attendance-history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    HolidayModule,
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionModule,
    AttendanceModule,
    UserAttendanceModule,
    AttendanceHistoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    IsUniqueConstraint,
    // UploadService,
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AppModule {}
