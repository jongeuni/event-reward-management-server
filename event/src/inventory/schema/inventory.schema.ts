import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import {
  OwnItem,
  OwnItemSchema,
  OwnTitle,
  OwnTitleSchema,
} from './own-item.schema';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: [OwnItemSchema] })
  itemId?: OwnItem[];

  @Prop({ type: OwnTitleSchema })
  titleId?: OwnTitle[];
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
