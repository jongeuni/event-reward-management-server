import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '../../auth/rqrs/user-role';

export const CurrentUserHeader = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestHeader => {
    const req = ctx.switchToHttp().getRequest();

    if (!req.user?.id || !req.user?.role) {
      throw new UnauthorizedException('헤더 정보 부족');
    }

    return {
      user_id: req.user.id,
      role: req.user.role,
    };
  },
);

export interface RequestHeader extends Record<string, string> {
  user_id: string;
  role: UserRole;
}