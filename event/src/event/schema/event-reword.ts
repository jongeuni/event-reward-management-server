// event/schemas/event-reward.schema.ts
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type EventRewardType = 'item' | 'cash' | 'title';

export class EventReward {
  @Prop({ required: true })
  type: EventRewardType;

  // 공통 속성
  @Prop()
  amount?: number;

  // 타입별 속성
  @Prop()
  itemId?: string;

  @Prop()
  cash?: string;

  @Prop()
  titleId?: string; // 칭호
}

export const EventRewardSchema = SchemaFactory.createForClass(EventReward);
