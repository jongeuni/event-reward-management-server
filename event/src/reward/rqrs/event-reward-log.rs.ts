import { EventRewardType } from '../../event/schema/event.type';

export class EventRewardLogRs {
  constructor(
    private eventId: string,
    private userId: string,
    private type: EventRewardType,
    private isSuccess: boolean,
    private requestedAt: Date,
  ) {}
}