import { UserRole } from '../../user-role';

export class CreateUserRq {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly role: UserRole,
  ) {}
}