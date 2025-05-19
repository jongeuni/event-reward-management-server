export class EventCreateRq {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly startedAt: Date,
    public readonly endedAt: Date | null,
    public readonly isPrivate: boolean,
    public readonly conditions: EventConditionRq[],
    public readonly rewords: EventRewordRq[],
  ) {}
}

// 조건
export class EventConditionRq {
  constructor(
    public readonly type: EventConditionType,
    public readonly days?: number,
    public readonly cash?: number,
    public readonly itemId?: string,
    public readonly count?: number,
  ) {}
}

// 보상
export class EventRewordRq {
  public readonly type: EventRewardType;
  public readonly itemId?: string;
  public readonly cash?: number;
  public readonly titleId?: string;
}
