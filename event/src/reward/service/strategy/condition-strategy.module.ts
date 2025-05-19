import {
  AttendanceStrategy,
  CashUseStrategy,
  ItemPurchasedStrategy,
} from './event-condition.impl';
import { Module } from '@nestjs/common';
import { EventConditionStrategy } from './event-condition.strategy';
import { UserAttendanceRepositoryModule } from '../../../user-attendance/repository/user-attendance.repository.module';
import { CashLogRepositoryModule } from '../../../cash-log/repository/cash-log.repository.module';

@Module({
  imports: [UserAttendanceRepositoryModule, CashLogRepositoryModule],
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
