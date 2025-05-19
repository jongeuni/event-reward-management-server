import { Injectable } from '@nestjs/common';
import { EventConditionType } from '../../../event/schema/event.type';
import { EventConditionStrategy } from './event-condition.strategy';
import { UserAttendanceRepository } from '../../../user-attendance/repository/user-attendance.repository';
import { EventCondition } from '../../../event/schema/event-condition';
import { CashLogRepository } from '../../../cash-log/repository/cash-log.repository';

@Injectable()
export class AttendanceStrategy implements EventConditionStrategy {
  constructor(
    private readonly attendanceRepository: UserAttendanceRepository,
  ) {}

  supports(type: string): boolean {
    return type === EventConditionType.ATTENDANCE;
  }

  async check(
    userId: string,
    condition: EventCondition,
    eventStartedDate: Date,
    eventEndedDate?: Date,
  ): Promise<boolean> {
    const attendanceDates =
      await this.attendanceRepository.findAttendancesInPeriod(
        userId,
        eventStartedDate,
        eventEndedDate,
      );

    const { days } = condition;

    return attendanceDates.length >= (days ?? 0);
  }
}

@Injectable()
export class CashUseStrategy implements EventConditionStrategy {
  constructor(private readonly cashLogRepository: CashLogRepository) {}

  supports(type: string): boolean {
    return type === EventConditionType.USE_CASH;
  }

  async check(userId: string, condition: EventCondition, eventStartedDate: Date, eventEndedDate?: Date): Promise<boolean> {
    const cashLogs = await this.cashLogRepository.findUsedCashLogInPeriod(userId, eventStartedDate, eventEndedDate);

    const usedCash = cashLogs.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.amount;
    }, 0)

    const { cash } = condition;

    return usedCash >= (cash ?? 0);

  }
}

@Injectable()
export class ItemPurchasedStrategy implements EventConditionStrategy {
  constructor(private readonly cashLogRepository: CashLogRepository) {}

  supports(type: string): boolean {
    return type === EventConditionType.ITEM_PURCHASE;
  }

  async check(userId: string, condition: EventCondition, eventStartedDate: Date, eventEndedDate?: Date): Promise<boolean> {
    if(condition.itemId) {
      const itemBuyLog = await this.cashLogRepository.findBuyItemLogInPeriod(userId, condition.itemId.toString(), eventStartedDate, eventEndedDate)

      const { count } = condition;

      if(itemBuyLog.length >= (count ?? 0)) {
        return true;
      }
    }

    return false;
  }
}
