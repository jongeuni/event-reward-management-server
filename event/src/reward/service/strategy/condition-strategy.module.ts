import {
  AttendanceStrategy,
  CashStrategy,
  ItemPurchasedStrategy,
} from './event-condition.impl';
import { Module } from '@nestjs/common';
import { EventConditionStrategy } from './event-condition.strategy';
import { UserAttendanceRepositoryModule } from '../../../user-attendance/repository/user-attendance.repository.module';

@Module({
  imports: [UserAttendanceRepositoryModule],
  providers: [
    AttendanceStrategy,
    CashStrategy,
    ItemPurchasedStrategy,
    {
      provide: 'REWARD_STRATEGIES',
      useFactory: (
        login: AttendanceStrategy,
        cash: CashStrategy,
        item: ItemPurchasedStrategy,
      ): EventConditionStrategy[] => [login, cash, item],
      inject: [AttendanceStrategy, CashStrategy, ItemPurchasedStrategy],
    },
  ],
  exports: ['REWARD_STRATEGIES'],
})
export class ConditionStrategyModule {}
