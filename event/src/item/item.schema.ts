import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ItemEffect, ItemEffectSchema } from './item-effect.schema';

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: '0.0.1' })
  version: string;

  @Prop({ type: [ItemEffectSchema], required: false })
  effect: ItemEffect;

  @Prop()
  price: number;
}

export type ItemDocument = HydratedDocument<Item>;
export const ItemSchema = SchemaFactory.createForClass(Item);
