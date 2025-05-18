import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserAttendance,
  UserAttendanceSchema,
} from '../schema/user-attendance';
import { UserAttendanceRepository } from './user-attendance.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAttendance.name, schema: UserAttendanceSchema },
    ]),
  ],
  providers: [UserAttendanceRepository],
  exports: [UserAttendanceRepository],
})
export class UserAttendanceRepositoryModule {}