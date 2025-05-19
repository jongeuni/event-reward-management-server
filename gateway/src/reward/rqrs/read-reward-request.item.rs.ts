import { ApiProperty } from '@nestjs/swagger';

export type EventRewardType = 'ITEM' | 'CASH' | 'TITLE' | 'NONE';

export class ReadRewardRequestItemRs {
  @ApiProperty()
  readonly eventId: string;

  @ApiProperty()
  readonly userId: string;

  @ApiProperty({ enum: ['ITEM', 'CASH', 'TITLE', 'NONE'] })
  readonly type: EventRewardType;

  @ApiProperty()
  readonly isSuccess: boolean;

  @ApiProperty()
  readonly requestedAt: Date;
}
