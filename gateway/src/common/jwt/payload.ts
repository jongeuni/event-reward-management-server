import { UserRole } from '../../auth/rqrs/user-role';

export interface UserPayload {
  type: TokenType.ACCESS_TOKEN | TokenType.REFRESH_TOKEN;
  id: string;
  email: string;
}

export interface AccessPayload extends UserPayload {
  type: TokenType.ACCESS_TOKEN;
  role: UserRole;
}

export interface RefreshPayload extends UserPayload {
  type: TokenType.REFRESH_TOKEN;
}

export enum TokenType {
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  ACCESS_TOKEN = 'ACCESS_TOKEN',
}
