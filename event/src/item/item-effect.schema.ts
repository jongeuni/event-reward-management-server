import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type EffectType = 'power';

export class ItemEffect {
  @Prop({ required: true })
  type: EffectType;

  @Prop({ required: true })
  plusValue: number;
}

export const ItemEffectSchema = SchemaFactory.createForClass(ItemEffect);
