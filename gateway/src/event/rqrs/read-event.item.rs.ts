import { ApiProperty } from '@nestjs/swagger';

export type EventConditionType = 'ATTENDANCE' | 'USE_CASH' | 'ITEM_PURCHASE';
export type EventRewardType = 'ITEM' | 'CASH' | 'TITLE';

export class ReadEventItemRs {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty({ type: Date })
  readonly startedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  readonly endedAt: Date | null;

  @ApiProperty()
  readonly isPrivate: boolean;

  @ApiProperty({ type: () => [EventConditionRs] })
  readonly conditions: EventConditionRs[];

  @ApiProperty({ type: () => [EventRewardRs] })
  readonly rewords: EventRewardRs[];
}

export class EventConditionRs {
  @ApiProperty({ enum: ['ATTENDANCE', 'USE_CASH', 'ITEM_PURCHASE'] })
  readonly type: EventConditionType;

  @ApiProperty({ required: false })
  readonly days?: number;

  @ApiProperty({ required: false })
  readonly cash?: number;

  @ApiProperty({ required: false })
  readonly itemId?: string;

  @ApiProperty({ required: false })
  readonly count?: number;
}

export class EventRewardRs {
  @ApiProperty({ enum: ['ITEM', 'CASH', 'TITLE'] })
  readonly type: EventRewardType;

  @ApiProperty({ required: false })
  readonly itemId?: string;

  @ApiProperty({ required: false })
  readonly cash?: number;

  @ApiProperty({ required: false })
  readonly titleId?: string;
}
