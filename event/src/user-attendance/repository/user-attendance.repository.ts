import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserAttendance,
  UserAttendanceDocument,
} from '../schema/user-attendance';
import { toObjectId } from '../../common/util/object-id';

@Injectable()
export class UserAttendanceRepository {
  constructor(
    @InjectModel(UserAttendance.name)
    private readonly userAttendanceModel: Model<UserAttendanceDocument>,
  ) {}

  async existsTodayAttendance(userId: string, date: Date) {
    const { year, month, startOfDay, endOfDay } =
      await this.getDateConditions(date);

    return this.userAttendanceModel.exists({
      userId: toObjectId(userId),
      year,
      month,
      dates: {
        $elemMatch: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      },
    });
  }

  async updateAttendance(userId: string, addDate: Date) {
    const { year, month } = await this.getDateConditions(addDate);

    await this.userAttendanceModel.updateOne(
      { userId: toObjectId(userId), year, month },
      {
        $setOnInsert: { userId: toObjectId(userId), year, month },
        $push: { dates: addDate },
      },
      { upsert: true },
    );
  }

  private async getDateConditions(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      startOfDay,
      endOfDay,
    };
  }

  async findAttendancesInPeriod(
    userId: string,
    startedDate: Date,
    endedDate?: Date,
  ): Promise<Date[]> {
    const startYear = startedDate.getFullYear();
    const startMonth = startedDate.getMonth() + 1;

    const query: any = {
      userId: toObjectId(userId),
    };

    if (endedDate) {
      const endYear = endedDate.getFullYear();
      const endMonth = endedDate.getMonth() + 1;

      query.$or = [
        { year: startYear, month: { $gte: startMonth } },
        { year: endYear, month: { $lte: endMonth } },
        {
          year: { $gt: startYear, $lt: endYear },
        },
      ];
    } else {
      query.year = startYear;
      query.month = { $gte: startMonth };
    }

    const docs = await this.userAttendanceModel.find(query, { dates: 1 });

    return docs.flatMap((doc) =>
      doc.dates.filter((date) => {
        return date >= startedDate && (!endedDate || date <= endedDate);
      }),
    );
  }
}
