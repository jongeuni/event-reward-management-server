import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import {
  OwnItem,
  OwnItemSchema,
  OwnTitle,
  OwnTitleSchema,
} from './own-item.schema';

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: [OwnItemSchema] })
  itemId?: OwnItem[];

  @Prop({ type: OwnTitleSchema })
  titleId?: OwnTitle[];
}

export type InventoryDocument = HydratedDocument<Inventory>;
export const InventorySchema = SchemaFactory.createForClass(Inventory);
