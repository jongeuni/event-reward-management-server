import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { EventRewardType } from '../../event/schema/event.type';

export type RewardRequestLogDocument = HydratedDocument<RewardRequestLog>;

@Schema()
export class RewardRequestLog {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  eventId: Types.ObjectId;

  @Prop({ required: true, type: mongoose.Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ enum: EventRewardType })
  type: EventRewardType;

  @Prop()
  isSuccess: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const RewardRequestLogSchema =
  SchemaFactory.createForClass(RewardRequestLog);
