import {
  AttendanceStrategy,
  CashUseStrategy,
  ItemPurchasedStrategy,
} from './event-condition.impl';
import { Module } from '@nestjs/common';
import { EventConditionStrategy } from './event-condition.strategy';
import { UserAttendanceRepositoryModule } from '../../../user-attendance/repository/user-attendance.repository.module';

@Module({
  imports: [UserAttendanceRepositoryModule],
  providers: [
    AttendanceStrategy,
    CashUseStrategy,
    ItemPurchasedStrategy,
    {
      provide: 'REWARD_STRATEGIES',
      useFactory: (
        login: AttendanceStrategy,
        cash: CashUseStrategy,
        item: ItemPurchasedStrategy,
      ): EventConditionStrategy[] => [login, cash, item],
      inject: [AttendanceStrategy, CashUseStrategy, ItemPurchasedStrategy],
    },
  ],
  exports: ['REWARD_STRATEGIES'],
})
export class ConditionStrategyModule {}
