import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ _id: false })
export class OwnItem {
  @Prop({ type: mongoose.Types.ObjectId })
  id: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OwnItemSchema = SchemaFactory.createForClass(OwnItem);

@Schema({ _id: false })
export class OwnTitle {
  @Prop({ type: mongoose.Types.ObjectId })
  id: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OwnTitleSchema = SchemaFactory.createForClass(OwnTitle);
