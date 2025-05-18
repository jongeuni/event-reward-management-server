import { EffectType } from '../schema/item-effect.schema';

export class ItemCreateRq {
  constructor(
    private title: string,
    private description: string,
    private version: string,
    private effectType: EffectType,
    private effectPlus: number,
    private price: number,
  ) {}
}