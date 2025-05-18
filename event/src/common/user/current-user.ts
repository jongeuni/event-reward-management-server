import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UserRole = 'USER' | 'OPERATOR' | 'AUDITOR' | 'ADMIN';

export interface CurrentUser {
  userId: string;
  role: UserRole;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUser => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.headers['user-id'];
    const role = request.headers['role'];

    if (!userId || !role) {
      throw new Error('Missing user-id or role in headers');
    }

    return { userId, role };
  },
);