import { Controller, Post } from '@nestjs/common';
import { UserAttendanceService } from './service/user-attendance.service';
import {
  CurrentUser as CurrentUserType,
  CurrentUser,
} from '../common/auth/current-user';

@Controller()
export class UserAttendanceController {
  constructor(private readonly userAttendanceService: UserAttendanceService) {}

  @Post('/attendances')
  async attendanceCheck(@CurrentUser() user: CurrentUserType) {
    await this.userAttendanceService.todayAttendanceCheck(user.userId);
  }
}