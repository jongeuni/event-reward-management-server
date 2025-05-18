import { UserAttendanceRepository } from '../repository/user-attendance.repository';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UserAttendanceService {
  constructor(
    private readonly userAttendanceRepository: UserAttendanceRepository,
  ) {}
}