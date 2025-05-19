import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '../../auth/rqrs/user-role';
import { Roles } from './role';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './role.guard';

export function AuthRoleGuard(...roles: UserRole[]) {
  return applyDecorators(Roles(roles), UseGuards(JwtAuthGuard, RolesGuard));
}