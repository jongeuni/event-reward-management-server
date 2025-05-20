import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from '../../common/util/object-id';
import { CashLog } from '../cash-log.schema';
import { CashLogType } from '../cash-log.type';

@Injectable()
export class CashLogRepository {
  constructor(
    @InjectModel(CashLog.name)
    private readonly cashLogModel: Model<CashLog>,
  ) {}

  async findUsedCashLogInPeriod(
    userId: string,
    startedDate: Date,
    endedDate?: Date,
  ): Promise<CashLog[]> {
    const filter: any = {
      userId: toObjectId(userId),
      type: CashLogType.USE,
      createdAt: {
        $gte: startedDate,
      },
    };

    if (endedDate) {
      filter.createdAt.$lte = endedDate;
    }

    return this.cashLogModel.find(filter).lean().exec();
  }

  async findBuyItemLogInPeriod(
    userId: string,
    itemId: string,
    startedDate: Date,
    endedDate?: Date,
  ) {
    const filter: any = {
      userId: toObjectId(userId),
      type: CashLogType.USE,
      itemId: toObjectId(itemId),
      createdAt: {
        $gte: startedDate,
      },
    };

    if (endedDate) {
      filter.createdAt.$lte = endedDate;
    }

    return this.cashLogModel.find(filter).lean().exec();
  }
}
