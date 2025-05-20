import { UserRole } from '../schema/user-role';

export class UserCreateDto {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly role: UserRole,
  ) {}
}
