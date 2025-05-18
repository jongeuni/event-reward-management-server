import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserAttendance,
  UserAttendanceSchema,
} from '../schema/user-attendance';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAttendance.name, schema: UserAttendanceSchema },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class UserAttendanceRepositoryModule {}