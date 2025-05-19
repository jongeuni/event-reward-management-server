import { EventRewardType } from './create-event.rq';
import { ApiProperty } from '@nestjs/swagger';

export class AddRewardRq {
  @ApiProperty({ enum: ['ITEM', 'CASH', 'TITLE'] })
  public readonly type: EventRewardType;

  @ApiProperty()
  public readonly itemId?: string;

  @ApiProperty()
  public readonly cash?: number;

  @ApiProperty()
  public readonly titleId?: string;
}