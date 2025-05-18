// event/schemas/event.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EventCondition, EventConditionSchema } from './event-condition';
import { EventReward, EventRewardSchema } from './event-reword';

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Date })
  startAt: Date;

  @Prop({ type: Date })
  endAt: Date;

  @Prop({ type: [EventConditionSchema], required: true })
  conditions: EventCondition[];

  @Prop({ type: EventRewardSchema, required: true })
  reward: EventReward;

  @Prop()
  createdBy?: string;
}

export type EventDocument = HydratedDocument<Event>;
export const EventSchema = SchemaFactory.createForClass(Event);
