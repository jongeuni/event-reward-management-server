import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SignUpRq } from './rqrs/sign-up.rq';
import { SignInRq } from './rqrs/sign-in.rq';

@Controller()
export class UserController {
  constructor(private readonly accountService: UserService) {}

  @Post('/sign-up')
  async signUp(@Body() rq: SignUpRq) {
    return this.accountService.signUp(rq);
  }

  @Post('/sign-in')
  async signIn(@Body() rq: SignInRq) {
    return this.accountService.signIn(rq);
  }
}