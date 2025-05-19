export type EventConditionType = 'ATTENDANCE' | 'USE_CASH' | 'ITEM_PURCHASE';

export type EventRewardType = 'ITEM' | 'CASH' | 'TITLE';

export class ReadEventItemRs {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | null,
    public readonly startedAt: Date,
    public readonly endedAt: Date | null,
    public readonly isPrivate: boolean,
    public readonly conditions: EventConditionRs[],
    public readonly rewords: EventRewordRs[],
  ) {}
}

// 조건
export class EventConditionRs {
  constructor(
    public readonly type: EventConditionType,
    public readonly days?: number,
    public readonly cash?: number,
    public readonly itemId?: string,
    public readonly count?: number,
  ) {}
}

// 보상
export class EventRewordRs {
  constructor(
    public readonly type: EventRewardType,
    public readonly itemId?: string,
    public readonly cash?: number,
    public readonly titleId?: string,
  ) {}
}
