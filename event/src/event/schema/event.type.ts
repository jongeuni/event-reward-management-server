export enum EventConditionType {
  ATTENDANCE = 'ATTENDANCE',
  USE_CASH = 'USE_CASH',
  ITEM_PURCHASE = 'ITEM_PURCHASE'
}

export function getEventConditionMean(type: EventConditionType): string {
  switch (type) {
    case EventConditionType.ATTENDANCE:
      return '출석 체크';
    case EventConditionType.USE_CASH:
      return '캐시 사용';
    case EventConditionType.ITEM_PURCHASE:
      return '아이템 구매';
    default:
      return '기타 조건';
  }
}

export enum EventRewardType {
  ITEM = 'ITEM',
  CASH = 'CASH',
  TITLE = 'TITLE',
  NONE = 'NONE'
}
