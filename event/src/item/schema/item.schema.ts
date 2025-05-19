import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ItemEffect, ItemEffectSchema } from './item-effect.schema';

export type ItemDocument = HydratedDocument<Item>;

@Schema({ timestamps: true })
export class Item {
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: '0.0.1' })
  version: string;

  @Prop({ type: ItemEffectSchema, required: false })
  effect: ItemEffect;

  @Prop()
  price: number;

  @Prop({ type: mongoose.Types.ObjectId })
  createdBy: Types.ObjectId;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
