import { UserRole } from '../../user-role';

export class CreateUserRq {
  constructor(
    readonly nickname: string,
    readonly email: string,
    readonly role: UserRole,
  ) {}
}