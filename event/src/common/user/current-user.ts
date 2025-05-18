import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export type UserRole = 'USER' | 'OPERATOR' | 'AUDITOR' | 'ADMIN';

export interface CurrentUser {
  userId: string;
  role: UserRole;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUser => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.headers['X-user-id'];
    const role = request.headers['X-role'];

    if (!userId || !role) {
      throw new UnauthorizedException('확인할 수 없는 사용자입니다.');
    }

    return { userId, role };
  },
);