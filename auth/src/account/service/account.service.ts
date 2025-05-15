import { Injectable, Scope } from '@nestjs/common';
import { SignUpRq } from '../controller/rqrs/sign-up.rq';
import { SignUpRs } from '../controller/rqrs/sign-up.rs';

@Injectable({ scope: Scope.REQUEST })
export class AccountService {
  async signIn(rq: SignUpRq): Promise<SignUpRs> {
    return await {
      loginId: 'user.loginId',
      password: '',
    };
  }
}