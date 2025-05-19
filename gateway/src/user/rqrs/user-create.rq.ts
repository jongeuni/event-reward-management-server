import { UserRole } from '../../auth/rqrs/user-role';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 유저 생성 Rq
 * @namespace UserCreateRq
 * @property nickname   - 닉네임
 * @property email      - 아이디 (이메일)
 */
export class UserCreateRq {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty({enum: UserRole})
  readonly role: UserRole;
}
