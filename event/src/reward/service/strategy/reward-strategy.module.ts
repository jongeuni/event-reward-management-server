import {
  CashStrategy,
  ConsecutiveLoginStrategy,
  ItemPurchasedStrategy,
} from './reward-condition.strategy.impl';
import { Module } from '@nestjs/common';
import { RewardConditionStrategy } from './reward-condition.strategy';
import { UserAttendanceRepositoryModule } from '../../../user/repository/user-attendance.repository.module';

@Module({
  imports: [UserAttendanceRepositoryModule],
  providers: [
    ConsecutiveLoginStrategy,
    CashStrategy,
    ItemPurchasedStrategy,
    {
      provide: 'REWARD_STRATEGIES',
      useFactory: (
        login: ConsecutiveLoginStrategy,
        cash: CashStrategy,
        item: ItemPurchasedStrategy,
      ): RewardConditionStrategy[] => [login, cash, item],
      inject: [ConsecutiveLoginStrategy, CashStrategy, ItemPurchasedStrategy],
    },
  ],
  exports: ['REWARD_STRATEGIES'],
})
export class RewardStrategyModule {}
