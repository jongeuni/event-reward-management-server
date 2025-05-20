import { ApiProperty } from '@nestjs/swagger';

export class ReadInventoryRs {
  @ApiProperty({ type: () => [OwnItemRs] })
  readonly items: OwnItemRs[];

  @ApiProperty({ type: () => [OwnTitleRs] })
  readonly titles: OwnTitleRs[];
}

export class OwnTitleRs {
  @ApiProperty()
  readonly titleId: string;

  @ApiProperty()
  readonly titleName: string;

  @ApiProperty({ type: Date })
  readonly getDate: Date;
}

export class OwnItemRs {
  @ApiProperty()
  readonly itemId: string;

  @ApiProperty()
  readonly itemName: string;
}