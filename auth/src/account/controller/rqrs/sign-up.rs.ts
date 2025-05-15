/**
 * 회원가입 Rq
 * @namespace SignUpRs
 * @property email      - 아이디
 * @property password     - 비밀번호
 */
export interface SignUpRs {
  /** 사용자 아이디 */
  loginId: string;
  /** 사용자 비밀번호 */
  password: string;

  // loginId: user.loginId,
  // name: user.name,
  // role: user.role,
  // accessToken: token.access,
  // refreshToken: token.refresh
}
