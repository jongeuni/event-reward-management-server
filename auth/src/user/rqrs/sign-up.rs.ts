import { UserRole } from '../schema/user-role';

/**
 * 회원가입 Rs
 * @namespace SignUpRs
 * @property email      - 이메일 (아이디)
 * @property password   - 비밀번호
 */
export class SignUpRs {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly role: UserRole,
    readonly accessToken: string,
    readonly refreshToken: string
  ) {
  }
}
