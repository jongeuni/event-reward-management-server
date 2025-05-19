import { ApiProperty } from '@nestjs/swagger';

export class SignInRs {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}
