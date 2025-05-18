import { Body, Controller, Post } from '@nestjs/common';
import { UserAttendanceService } from './service/user-attendance.service';

@Controller()
export class UserAttendanceController {
  constructor(private readonly userAttendanceService: UserAttendanceService) {}

  @Post('/attendance')
  async attendanceCheck(@Body() rq: any) {}
}