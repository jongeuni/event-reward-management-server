import { ApiProperty } from '@nestjs/swagger';

/**
 * 회원가입 Rq
 * @namespace SignUpRq
 * @property name   - 이름
 * @property email      - 아이디 (이메일)
 * @property password   - 비밀번호
 */
export class SignUpRq {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
