import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: [mongoose.Types.ObjectId] })
  itemId?: Types.ObjectId[];

  @Prop({ type: mongoose.Types.ObjectId })
  titleId?: Types.ObjectId[]; // 획득일
}

export type InventoryDocument = HydratedDocument<Inventory>;
export const InventorySchema = SchemaFactory.createForClass(Inventory);
