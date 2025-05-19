import { ApiProperty } from '@nestjs/swagger';

export class IdRs {
  @ApiProperty()
  readonly id: string;
}
