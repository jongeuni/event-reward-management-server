import { ApiProperty } from '@nestjs/swagger';

export type EffectType = 'POWER';

export class CreateItemRq {
  @ApiProperty()
  public readonly title: string;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  public readonly version: string;

  @ApiProperty({ enum: ['POWER'] })
  public readonly effectType: EffectType;

  @ApiProperty()
  public readonly effectPlus: number;

  @ApiProperty()
  public readonly price: number;
}
