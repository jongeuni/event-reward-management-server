import { UserAttendanceRepository } from '../repository/user-attendance.repository';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UserAttendanceService {
  constructor(
    private readonly userAttendanceRepository: UserAttendanceRepository,
  ) {}

  async todayAttendanceCheck(userId: string) {
    const today = new Date();

    if (
      await this.userAttendanceRepository.existsTodayAttendance(userId, today)
    ) {
      return;
    }
    await this.userAttendanceRepository.updateAttendance(userId, today);
  }
}