import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { EventRewardType } from '../event/schema/event-reword';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type RewordLogDocument = HydratedDocument<RewordLog>;

export class RewordLog {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  eventId: ObjectId;

  @Prop({ required: true, type: mongoose.Types.ObjectId })
  userId: ObjectId;

  @Prop({ required: true })
  type: EventRewardType;

  @Prop()
  isSuccess: boolean;
}

export const RewordLogSchema = SchemaFactory.createForClass(RewordLog);
