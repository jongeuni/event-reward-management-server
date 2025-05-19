import { Injectable } from '@nestjs/common';
import { WalletRepository } from './repository/wallet.repository';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: WalletRepository,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async chargeCash(userId: string, amount: number) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const balance = await this.walletRepository.chargeCash(
        userId,
        amount,
        session,
      );
      return {
        balance,
      };
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }
}
