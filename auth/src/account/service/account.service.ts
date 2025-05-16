import { Injectable, Scope } from '@nestjs/common';
import { SignUpRq } from '../controller/rqrs/sign-up.rq';
import { SignUpRs } from '../controller/rqrs/sign-up.rs';
import { AccountRepository } from '../repository/account.repository';
import { Account } from '../account';

@Injectable({ scope: Scope.REQUEST })
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async signUp(rq: SignUpRq): Promise<SignUpRs> {
    const { email, nickname, password } = rq;
    const account: Account =  await this.accountRepository.create({
      email,
      name: nickname,
      password,
      role: "USER"
    });

    return {
      nickname: account.name,
      email: account.email,
      role: account.role,
      accessToken: "",
      refreshToken: ""
    }
  }
}