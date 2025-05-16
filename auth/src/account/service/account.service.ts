import { BadRequestException, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { SignUpRq } from '../controller/rqrs/sign-up.rq';
import { SignUpRs } from '../controller/rqrs/sign-up.rs';
import { AccountRepository } from '../repository/account.repository';
import { Account } from '../account';
import * as bcrypt from 'bcrypt';
import { SignInRq } from '../controller/rqrs/sign-in.rq';
import { SignInRs } from '../controller/rqrs/sign-in.rs';

@Injectable({ scope: Scope.REQUEST })
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async signUp(rq: SignUpRq): Promise<SignUpRs> {

    const account: Account =  await this.accountRepository.create({
      email: rq.email,
      name: rq.nickname,
      password: await bcrypt.hash(rq.password, 10),
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

  async signIn(rq: SignInRq): Promise<SignInRs> {
    const account = await this.accountRepository.findByEmail(rq.email);

    if(!account) {
      throw new NotFoundException("account not found");
    }

    if(!await bcrypt.compare(rq.password, account.password)) {
      throw new BadRequestException("password not matched");
    }

    return {
      accessToken: "true",
      refreshToken: "true"
    }
  }
}