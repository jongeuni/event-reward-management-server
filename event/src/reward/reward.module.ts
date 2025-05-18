import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './service/reward.service';
import { RewardStrategyModule } from './service/strategy/reward-strategy.module';
import { RewordLogRepositoryModule } from './repository/reward-log.repository.module';
import { EventRepositoryModule } from '../event/repository/event.repository.module';

@Module({
  imports: [
    RewardStrategyModule,
    RewordLogRepositoryModule,
    EventRepositoryModule,
  ],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
