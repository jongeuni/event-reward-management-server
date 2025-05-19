import { ApiProperty } from '@nestjs/swagger';

export class ChargeCashRq {
  @ApiProperty()
  readonly amount: number;
}