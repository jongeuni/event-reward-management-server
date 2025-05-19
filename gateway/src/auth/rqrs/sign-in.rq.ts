import { ApiProperty } from '@nestjs/swagger';

export class SignInRq {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
