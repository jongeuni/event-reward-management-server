import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '../../auth/rqrs/user-role';

export const CurrentUserHeader = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestHeader => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user?.userId || !req.user?.role) {
      throw new UnauthorizedException('헤더 정보 부족');
    }

    return {
      'x-user-id': req.user.userId,
      'x-role': req.user.role,
    };
  },
);

export interface RequestHeader extends Record<string, string> {
  'x-user-id': string;
  'x-role': UserRole;
}