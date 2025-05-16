/**
 * 회원가입 Rq
 * @namespace SignUpRq
 * @property nickname   - 닉네임
 * @property email      - 아이디 (이메일)
 * @property password   - 비밀번호
 */
export interface SignUpRq {
  nickname: string;
  email: string;
  password: string;
}
