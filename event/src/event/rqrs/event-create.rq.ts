import { EventConditionType, EventRewardType } from '../schema/event.type';
import { ObjectId } from 'mongoose';

export class EventCreateRq {
  private title: string;
  private description: string;
  private startedAt: Date;
  private endedAt: Date | null; // null 일 경우 상시
  private conditions: EventConditionRq[];
  private rewords: EventRewordRq[];
}

// 조건
export class EventConditionRq {
  private type: EventConditionType;
  private days?: number;
  private cash?: number;
  private itemId?: ObjectId;
  private count?: number;
}

// 보상
export class EventRewordRq {
  private type: EventRewardType;
  private amount?: number;
  private itemId?: ObjectId;
  private cash?: string;
  private titleId?: ObjectId;
}
