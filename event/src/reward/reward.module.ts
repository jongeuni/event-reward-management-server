import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './service/reward.service';
import { RewardStrategyModule } from './service/strategy/reward-strategy.module';
import { RewardLogRepositoryModule } from './repository/reward-log.repository.module';
import { EventRepositoryModule } from '../event/repository/event.repository.module';
import { WalletRepositoryModule } from '../user-wallet/rqrs/repository/wallet.repository.module';

@Module({
  imports: [
    RewardStrategyModule,
    RewardLogRepositoryModule,
    EventRepositoryModule,
    WalletRepositoryModule,
  ],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
