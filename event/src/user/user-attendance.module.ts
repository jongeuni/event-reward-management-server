import { Module } from '@nestjs/common';
import { UserAttendanceRepositoryModule } from './user-attendance.repository.module';
import { UserAttendanceService } from './user-attendance.service';
import { UserAttendanceController } from './user-attendance.controller';

@Module({
  imports: [UserAttendanceRepositoryModule],
  controllers: [UserAttendanceController],
  providers: [UserAttendanceService],
})
export class UserAttendanceModule {}