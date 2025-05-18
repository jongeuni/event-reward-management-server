import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { EventRewardType } from '../../event/schema/event.type';

export type RewardLogDocument = HydratedDocument<RewardLog>;

export class RewardLog {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  eventId: ObjectId;

  @Prop({ required: true, type: mongoose.Types.ObjectId })
  userId: ObjectId;

  @Prop({ enum: EventRewardType })
  type: EventRewardType;

  @Prop()
  isSuccess: boolean;
}

export const RewordLogSchema = SchemaFactory.createForClass(RewardLog);
