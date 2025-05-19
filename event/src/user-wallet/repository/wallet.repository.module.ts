import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserWallet, UserWalletSchema } from '../schema/wallet.schema';
import { WalletRepository } from './wallet.repository';
import { CashLog, CashLogSchema } from '../../cash-log/cash-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserWallet.name, schema: UserWalletSchema },
      { name: CashLog.name, schema: CashLogSchema },
    ]),
  ],
  providers: [WalletRepository],
  exports: [WalletRepository],
})
export class WalletRepositoryModule {}