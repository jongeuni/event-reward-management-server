/**
 * 회원가입 Rq
 * @namespace SignUpRq
 * @property email      - 아이디
 * @property password     - 비밀번호
 */
export interface SignUpRq {
  /** 사용자 아이디 */
  loginId: string;
  /** 사용자 비밀번호 */
  password: string;
}
