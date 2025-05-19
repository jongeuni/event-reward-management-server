import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './service/reward.service';
import { ConditionStrategyModule } from './service/strategy/condition-strategy.module';
import { RewardLogRepositoryModule } from './repository/reward-log.repository.module';
import { EventRepositoryModule } from '../event/repository/event.repository.module';
import { WalletRepositoryModule } from '../user-wallet/repository/wallet.repository.module';
import { InventoryRepositoryModule } from '../inventory/repository/inventory.repository.module';
import { TitleRepositoryModule } from '../title/title.repository.module';
import { ItemRepositoryModule } from '../item/repository/item.repository.module';

@Module({
  imports: [
    ConditionStrategyModule,
    RewardLogRepositoryModule,
    EventRepositoryModule,
    WalletRepositoryModule,
    InventoryRepositoryModule,
    TitleRepositoryModule,
    ItemRepositoryModule,
  ],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
