import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserWallet, UserWalletDocument } from '../schema/wallet.schema';
import { CashLog } from '../../cash-log/cash-log.schema';
import { CashLogType, CashSourceType } from '../../cash-log/cash-log.type';
import { toObjectId } from '../../common/util/object-id';

@Injectable()
export class WalletRepository {
  constructor(
    @InjectModel(UserWallet.name)
    private readonly walletModel: Model<UserWalletDocument>,
    @InjectModel(CashLog.name)
    private readonly cashLogModel: Model<CashLog>,
  ) {}

  async findByUserId(userId: string): Promise<UserWallet | null> {
    return this.walletModel.findOne({ userId }).lean().exec();
  }

  async chargeCash(userId: string, amount: number) {
    const wallet = await this.addCash(toObjectId(userId), amount);

    await this.cashLogModel.create({
      userId: toObjectId(userId),
      type: CashLogType.CHARGE,
      amount,
      source: CashSourceType.USER,
      afterBalance: wallet.balance,
    });

    return wallet.balance;
  }

  async addCashFromEvent(userId: string, amount: number, eventId: string) {
    const wallet = await this.addCash(toObjectId(userId), amount);

    await this.cashLogModel.create({
      userId: toObjectId(userId),
      type: CashLogType.BONUS,
      amount,
      source: CashSourceType.EVENT,
      description: `이벤트 보상: ${eventId}`,
      afterBalance: wallet.balance,
    });

    return wallet;
  }

  async minusCashFromItem(
    userId: string,
    itemId: string,
    amount: number,
  ): Promise<void> {
    const wallet = await this.minusCash(userId, amount);

    await this.cashLogModel.create({
      userId: toObjectId(userId),
      type: CashLogType.USE,
      amount,
      source: CashSourceType.USER,
      itemId: toObjectId(itemId),
      afterBalance: wallet.balance,
    });
  }

  private async minusCash(userId: string, amount: number): Promise<UserWallet> {
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
      .exec();

    if (!wallet) {
      throw new Error('잔액이 부족하거나 지갑이 없습니다.');
    }

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
