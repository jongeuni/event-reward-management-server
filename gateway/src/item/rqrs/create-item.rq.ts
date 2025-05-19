export type EffectType = 'POWER';

export class CreateItemRq {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly version: string,
    public readonly effectType: EffectType,
    public readonly effectPlus: number,
    public readonly price: number,
  ) {}
}

