// event/schemas/event.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { EventCondition, EventConditionSchema } from './event-condition';
import { EventReward, EventRewardSchema } from './event-reword';

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Date })
  startedAt: Date;

  @Prop({ type: Date })
  endedAt?: Date;

  @Prop({ type: [EventConditionSchema], required: true })
  conditions: EventCondition[];

  @Prop({ type: [EventRewardSchema], required: false })
  rewards: EventReward[];

  @Prop()
  createdBy?: ObjectId;
}

export type EventDocument = HydratedDocument<Event>;
export const EventSchema = SchemaFactory.createForClass(Event);
