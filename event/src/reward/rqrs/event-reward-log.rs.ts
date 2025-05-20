import { EventRewardType } from '../../event/schema/event.type';

export class EventRewardLogRs {
  constructor(
    readonly eventId: string,
    readonly userId: string,
    readonly type: EventRewardType,
    readonly isSuccess: boolean,
    readonly requestedAt: Date,
  ) {}
}