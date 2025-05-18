export enum EventType {
  LOGIN = 'LOGIN',
  USE_CASH = 'USE_CASH',
}

export type EventConditionType =
  | 'consecutive_login'
  | 'cash_spent'
  | 'item_purchased';

export type EventRewardType = 'item' | 'cash' | 'title';
