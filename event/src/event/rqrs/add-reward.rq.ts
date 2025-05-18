import { EventRewardType } from '../schema/event.type';

export class AddRewardRq {
  constructor(
    public readonly type: EventRewardType,
    public readonly itemId?: string,
    public readonly cash?: number,
    public readonly titleId?: string,
  ) {}
}