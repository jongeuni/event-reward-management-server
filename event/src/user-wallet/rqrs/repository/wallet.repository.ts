import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { UserWallet, UserWalletDocument } from '../../schema/wallet.schema';
import { CashLog } from '../../schema/cash-log.schema';
import { CashLogType, CashSourceType } from '../../schema/cash-log.type';
import { toObjectId } from '../../../common/util/object-id';

@Injectable()
export class WalletRepository {
  constructor(
    @InjectModel(UserWallet.name)
    private readonly walletModel: Model<UserWalletDocument>,
    @InjectModel(CashLog.name)
    private readonly cashLogModel: Model<CashLog>,
  ) {}

  async findByUserId(
    userId: string,
    session?: ClientSession,
  ): Promise<UserWallet | null> {
    return this.walletModel
      .findOne({ userId })
      .session(session ?? null)
      .lean()
      .exec();
  }

  async addCashFromEvent(
    userId: string,
    amount: number,
    eventId: string,
    session: ClientSession,
  ) {
    const wallet = await this.addCash(toObjectId(userId), amount, session);

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

  async minusCashFromItem(
    userId: string,
    itemId: string,
    amount: number,
    session: ClientSession,
  ): Promise<void> {
    const wallet = await this.minusCash(userId, amount, session);

    await this.cashLogModel.create({
      userId: toObjectId(userId),
      type: CashLogType.USE,
      amount,
      source: CashSourceType.USER,
      itemId: toObjectId(itemId),
      afterBalance: wallet.balance,
    });
  }

  async minusCash(
    userId: string,
    amount: number,
    session: ClientSession,
  ): Promise<UserWallet> {
    const wallet = await this.walletModel
      .findOneAndUpdate(
        {
          userId,
          balance: { $gte: amount },
        },
        {
          $inc: { balance: -amount },
          $set: { updatedAt: new Date() },
        },
        { new: true },
      )
      .session(session)
      .exec();

    if (!wallet) {
      throw new Error('잔액이 부족하거나 지갑이 없습니다.');
    }

    return wallet;
  }

  private async addCash(
    userId: Types.ObjectId,
    amount: number,
    session: ClientSession,
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
      .session(session)
      .exec();
  }
}
