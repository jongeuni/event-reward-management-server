import { ApiProperty } from '@nestjs/swagger';

export class ChargeCashRs {
  @ApiProperty()
  readonly balance: number;
}