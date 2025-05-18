import { Injectable } from '@nestjs/common';
import { EventConditionType } from '../../../event/schema/event.type';
import { RewardConditionStrategy } from './reward-condition.strategy';
import { UserAttendanceRepository } from '../../../user/repository/user-attendance.repository';

@Injectable()
export class ConsecutiveLoginStrategy implements RewardConditionStrategy {
  constructor(private readonly userRepository: UserAttendanceRepository) {}

  supports(type: string): boolean {
    return type === EventConditionType.LOGIN;
  }

  async check(userId: string, condition: any): Promise<boolean> {
    // 조건 처리 로직
    const { days } = condition;
    // checkConsecutiveLogin(userId, days);
    return true;
  }
}

@Injectable()
export class CashStrategy implements RewardConditionStrategy {
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
export class ItemPurchasedStrategy implements RewardConditionStrategy {
  supports(type: string): boolean {
    return type === EventConditionType.ITEM_PURCHASE;
  }

  async check(userId: string, condition: any): Promise<boolean> {
    const { itemId, count } = condition;
    // checkItemPurchased(userId, itemId, count);
    return true;
  }
}
