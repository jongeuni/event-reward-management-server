import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type TitleDocument = HydratedDocument<Title>;

@Schema({ timestamps: true })
export class Title {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  isSuccess: boolean;

  @Prop({ type: mongoose.Types.ObjectId })
  createdBy: Types.ObjectId;
}

export const TitleSchema = SchemaFactory.createForClass(Title);
