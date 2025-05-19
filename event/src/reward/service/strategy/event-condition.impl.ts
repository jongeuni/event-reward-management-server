import { Injectable } from '@nestjs/common';
import { EventConditionType } from '../../../event/schema/event.type';
import { EventConditionStrategy } from './event-condition.strategy';
import { UserAttendanceRepository } from '../../../user-attendance/repository/user-attendance.repository';

@Injectable()
export class AttendanceStrategy implements EventConditionStrategy {
  constructor(private readonly userRepository: UserAttendanceRepository) {}

  supports(type: string): boolean {
    return type === EventConditionType.MONTH_ATTENDANCE;
  }

  async check(userId: string, condition: any): Promise<boolean> {
    // 조건 처리 로직
    const { days } = condition;
    // checkConsecutiveLogin(userId, days);
    return true;
  }
}

@Injectable()
export class CashStrategy implements EventConditionStrategy {
  supports(type: string): boolean {
    return type === EventConditionType.USE_CASH;
  }

  async check(userId: string, condition: any): Promise<boolean> {
    const { amount } = condition;
    // checkCashSpent(userId, amount);
    return true;
  }
}

@Injectable()
export class ItemPurchasedStrategy implements EventConditionStrategy {
  supports(type: string): boolean {
    return type === EventConditionType.ITEM_PURCHASE;
  }

  async check(userId: string, condition: any): Promise<boolean> {
    const { itemId, count } = condition;
    // checkItemPurchased(userId, itemId, count);
    return true;
  }
}
