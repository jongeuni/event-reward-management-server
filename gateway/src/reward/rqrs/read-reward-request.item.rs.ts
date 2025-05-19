export type EventRewardType = 'ITEM' | 'CASH' | 'TITLE' | 'NONE';

export class ReadRewardRequestItemRs {
  constructor(
    private eventId: string,
    private userId: string,
    private type: EventRewardType,
    private isSuccess: boolean,
    private requestedAt: Date,
  ) {}
}

