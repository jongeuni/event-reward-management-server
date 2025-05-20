/**
 * 회원가입 Rq
 * @namespace SignUpRq
 * @property name       - 이름
 * @property email      - 아이디 (이메일)
 * @property password   - 비밀번호
 */
export class SignUpRq {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
  ) {
  }
}
