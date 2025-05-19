import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EffectType = 'POWER';

@Schema({ _id: false })
export class ItemEffect {
  @Prop({ required: true })
  type: EffectType;

  @Prop({ required: true })
  plusValue: number;
}

export const ItemEffectSchema = SchemaFactory.createForClass(ItemEffect);
