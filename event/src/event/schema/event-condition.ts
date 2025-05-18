// event/schemas/event-condition.schema.ts
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { EventConditionType } from './event.type';

export class EventCondition {
  @Prop({ required: true })
  type: EventConditionType;

  // optional: 조건별 필요한 필드 정의
  @Prop()
  days?: number;

  @Prop()
  cash?: number;

  @Prop()
  itemId?: string;

  @Prop()
  count?: number;
}

export const EventConditionSchema = SchemaFactory.createForClass(EventCondition);
