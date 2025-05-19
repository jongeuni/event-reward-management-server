import { ApiProperty } from '@nestjs/swagger';

export class SignInRq {
  @ApiProperty({ default: 'admin01' })
  email: string;
  @ApiProperty({ default: 'admin01' })
  password: string;
}
