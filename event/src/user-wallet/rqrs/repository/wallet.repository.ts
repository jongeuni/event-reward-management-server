import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserWallet, UserWalletDocument } from '../../schema/wallet.schema';
import { CashLog } from '../../schema/cash-log.schema';
import { CashLogType, CashSourceType } from '../../schema/cash-log.type';
import { toObjectId } from '../../../common/util/object-id';

@Injectable()
export class WalletRepository {
  constructor(
    @InjectModel(UserWallet.name)
    readonly walletModel: Model<UserWalletDocument>,
    @InjectModel(CashLog.name)
    readonly cashLogModel: Model<CashLog>,
  ) {}

  async addCashFromEvent(userId: string, amount: number, eventId: string) {
    const wallet = await this.addCash(toObjectId(userId), amount);

    await this.cashLogModel.create({
      userId: toObjectId(userId),
      type: CashLogType.BONUS,
      amount,
      source: CashSourceType.EVENT,
      description: `이벤트 보상: ${eventId}`, // 커스텀 필드
      afterBalance: wallet.balance,
    });

    return wallet;
  }

  private async addCash(
    userId: Types.ObjectId,
    amount: number,
  ): Promise<UserWallet> {
    return await this.walletModel
      .findOneAndUpdate(
        { userId },
        {
          $inc: { balance: amount },
          $set: { updatedAt: new Date() },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      )
      .exec();
  }
}
