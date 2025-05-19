import { UserRole } from './user-role';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpRs {
  @ApiProperty()
  readonly nickname: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly role: UserRole;

  @ApiProperty()
  readonly accessToken: string;

  @ApiProperty()
  readonly refreshToken: string;
}
