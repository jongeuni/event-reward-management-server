import { UserRole } from '../../auth/rqrs/user-role';
import { TokenType } from './token-type';

export interface UserPayload {
  type: TokenType.ACCESS_TOKEN | TokenType.REFRESH_TOKEN;
  id: string;
  email: string;
}

export interface AccessPayload extends UserPayload {
  type: TokenType.ACCESS_TOKEN;
  name: string;
  role: UserRole;
}

export interface RefreshPayload extends UserPayload {
  type: TokenType.REFRESH_TOKEN;
}
