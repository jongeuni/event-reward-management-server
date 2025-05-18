import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { EventRewardType } from '../event/schema/event-reword';
import { HydratedDocument, ObjectId } from 'mongoose';

export type RewordLogDocument = HydratedDocument<RewordLog>;

export class RewordLog {
  @Prop({ required: true })
  eventId: ObjectId;

  @Prop({ required: true })
  userId: ObjectId;

  @Prop({ required: true })
  type: EventRewardType;

  @Prop()
  isSuccess: boolean;
}

export const RewordLogSchema = SchemaFactory.createForClass(RewordLog);
