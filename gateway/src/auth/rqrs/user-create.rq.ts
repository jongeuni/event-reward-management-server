import { UserRole } from './user-role';

/**
 * 회원가입 Rq
 * @namespace UserCreateRq
 * @property nickname   - 닉네임
 * @property email      - 아이디 (이메일)
 * @property password   - 비밀번호
 */
export interface UserCreateRq {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
