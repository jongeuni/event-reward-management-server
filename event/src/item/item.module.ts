import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './service/item.service';
import { ItemRepositoryModule } from './repository/item.repository.module';
import { InventoryRepositoryModule } from '../inventory/repository/inventory.repository.module';
import { WalletRepositoryModule } from '../user-wallet/repository/wallet.repository.module';

@Module({
  imports: [
    ItemRepositoryModule,
    InventoryRepositoryModule,
    WalletRepositoryModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}