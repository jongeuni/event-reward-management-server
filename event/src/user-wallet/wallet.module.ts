import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletRepositoryModule } from './repository/wallet.repository.module';

@Module({
  imports: [WalletRepositoryModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
