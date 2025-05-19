import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from '../../common/util/object-id';
import { CashLog } from '../cash-log.schema';
import { CashLogType, CashSourceType } from '../cash-log.type';

@Injectable()
export class CashLogRepository {
  constructor(
    @InjectModel(CashLog.name)
    private readonly cashLogModel: Model<CashLog>,
  ) {}

  async addCashFromEventLog(
    userId: string,
    amount: number,
    eventId: string,
    balance: number,
  ) {
    await this.cashLogModel.create({
      userId: toObjectId(userId),
      type: CashLogType.BONUS,
      amount,
      source: CashSourceType.EVENT,
      description: `이벤트 보상: ${eventId}`, // 커스텀 필드
      afterBalance: balance,
    });
  }

  async useCashFromItemLog(
    userId: string,
    itemId: string,
    amount: number,
    balance: number,
  ): Promise<void> {
    await this.cashLogModel.create({
      userId: toObjectId(userId),
      type: CashLogType.USE,
      amount,
      source: CashSourceType.USER,
      itemId: toObjectId(itemId),
      afterBalance: balance,
    });
  }

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
