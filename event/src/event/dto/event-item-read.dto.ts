import { EventConditionType, EventRewardType } from '../schema/event.type';

export class EventItemReadDto {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | null,
    public readonly startedAt: Date,
    public readonly endedAt: Date | null,
    public readonly isPrivate: boolean,
    public readonly conditions: EventConditionReadDto[],
    public readonly rewords: EventRewardReadDto[],
  ) {}
}

// 조건
export class EventConditionReadDto {
  constructor(
    public readonly type: EventConditionType,
    public readonly days?: number,
    public readonly cash?: number,
    public readonly itemId?: string,
    public readonly count?: number,
  ) {}
}

// 보상
export class EventRewardReadDto {
  constructor(
    public readonly type: EventRewardType,
    public readonly item?: {
      _id: string;
      title: string;
    } | null,
    public readonly cash?: number,
    public readonly title?: {
      _id: string;
      name: string;
    } | null,
  ) {}
}

export function toEventItemReadDto(event: any): EventItemReadDto {
  return new EventItemReadDto(
    event._id.toString(),
    event.title,
    event.description ?? null,
    event.startedAt,
    event.endedAt ?? null,
    event.isPrivate,
    event.conditions.map(
      (condition: any) =>
        new EventConditionReadDto(
          condition.type,
          condition.days,
          condition.cash,
          condition.itemId?.toString(),
          condition.count,
        ),
    ),
    event.rewards.map(
      (reward: any) =>
        new EventRewardReadDto(
          reward.type,
          reward.itemId
            ? {
                _id:
                  reward.itemId._id?.toString?.() ?? reward.itemId.toString(),
                title: reward.itemId.title,
              }
            : null,
          reward.cash,
          reward.titleId
            ? {
                _id:
                  reward.titleId._id?.toString?.() ?? reward.titleId.toString(),
                name: reward.titleId.name,
              }
            : null,
        ),
    ),
  );
}
