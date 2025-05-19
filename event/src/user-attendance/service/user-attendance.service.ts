import { UserAttendanceRepository } from '../repository/user-attendance.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
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