// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../auth/controller/rqrs/user-role';

export const ROLES_KEY = 'roles';

// 유니언 타입 허용 (배열 또는 단일값)
export const Roles = (roles: UserRole | UserRole[]) =>
  SetMetadata(ROLES_KEY, Array.isArray(roles) ? roles : [roles]);
