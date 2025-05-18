// event/schemas/event.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { EventCondition, EventConditionSchema } from './event-condition';
import { EventReward, EventRewardSchema } from './event-reword';
import { EventCreateDto } from '../dto/event-create.dto';

@Schema({ timestamps: true })
export class Event {
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  isPrivate: boolean;

  @Prop({ type: Date })
  startedAt: Date;

  @Prop({ type: Date })
  endedAt?: Date;

  @Prop({ type: [EventConditionSchema], required: true })
  conditions: EventCondition[];

  @Prop({ type: [EventRewardSchema], required: false })
  rewards: EventReward[];

  @Prop()
  createdBy?: Types.ObjectId;

  // rq.itemId == undefined ? undefined : toObjectId(rq.itemId),

  constructor(dto: EventCreateDto, userId: Types.ObjectId) {
    this.title = dto.title;
    this.description = dto.description;
    this.startedAt = dto.startedAt;
    this.endedAt = dto.endedAt ?? undefined;
    this.isPrivate = dto.isPrivate;
    this.conditions = dto.conditions.map(
      (condition) => new EventCondition(condition),
    );
    this.rewards = dto.rewords.map((reword) => new EventReward(reword));
    this.createdBy = userId;
  }
}

export type EventDocument = HydratedDocument<Event>;
export const EventSchema = SchemaFactory.createForClass(Event);
