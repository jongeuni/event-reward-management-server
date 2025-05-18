import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserAttendance,
  UserAttendanceDocument,
} from '../schema/user-attendance';

@Injectable()
export class UserAttendanceRepository {
  constructor(
    @InjectModel(UserAttendance.name)
    readonly userAttendanceModel: Model<UserAttendanceDocument>,
  ) {}
}
