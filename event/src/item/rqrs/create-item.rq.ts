import { EffectType } from '../schema/item-effect.schema';

export class CreateItemRq {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly version: string,
    readonly effectType: EffectType,
    readonly effectPlus: number,
    readonly price: number,
  ) {}
}