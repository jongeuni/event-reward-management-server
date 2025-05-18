import { EventConditionType, EventRewardType } from '../schema/event.type';
import {
  EventConditionRq,
  EventCreateRq,
  EventRewordRq,
} from '../rqrs/event-create.rq';

export class EventCreateDto {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly startedAt: Date,
    public readonly endedAt: Date | null,
    public readonly isPrivate: boolean,
    public readonly conditions: EventConditionDto[],
    public readonly rewords: EventRewardDto[],
  ) {}

  static from(rq: EventCreateRq): EventCreateDto {
    return new EventCreateDto(
      rq.title,
      rq.description,
      rq.startedAt,
      rq.endedAt,
      rq.isPrivate,
      rq.conditions.map((condition) => {
        return EventConditionDto.from(condition);
      }),
      rq.rewords.map((reword) => {
        return EventRewardDto.from(reword);
      }),
    );
  }
}

// 조건
export class EventConditionDto {
  constructor(
    public readonly type: EventConditionType,
    public readonly days?: number,
    public readonly cash?: number,
    public readonly itemId?: string,
    public readonly count?: number,
  ) {}

  static from(rq: EventConditionRq): EventConditionDto {
    return new EventConditionDto(
      rq.type,
      rq.days,
      rq.cash,
      rq.itemId,
      rq.count,
    );
  }
}

// 보상
export class EventRewardDto {
  constructor(
    public readonly type: EventRewardType,
    public readonly itemId?: string,
    public readonly cash?: number,
    public readonly titleId?: string,
  ) {}

  static from(rq: EventRewordRq): EventRewardDto {
    return new EventRewardDto(rq.type, rq.itemId, rq.cash, rq.titleId);
  }
}
