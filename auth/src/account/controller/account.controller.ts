import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { SignUpRq } from './rqrs/sign-up.rq';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/sign-up')
  async signIn(@Body() rq: SignUpRq) {
    return this.accountService.signIn(rq);
  }
}