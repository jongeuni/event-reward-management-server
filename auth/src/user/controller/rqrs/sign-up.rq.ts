/**
 * 회원가입 Rq
 * @namespace SignUpRq
 * @property name   - 닉네임
 * @property email      - 아이디 (이메일)
 * @property password   - 비밀번호
 */
export interface SignUpRq {
  name: string;
  email: string;
  password: string;
}
