import { AccountRole } from './account-role';


/**
 * 회원가입 Rq
 * @namespace SignUpRs
 * @property email      - 아이디
 * @property password     - 비밀번호
 */
export interface SignUpRs {
  nickname: string;

  email: string;

  role: AccountRole;

  accessToken: string;

  refreshToken: string;
}
