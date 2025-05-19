import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SignUpRq } from './rqrs/sign-up.rq';
import { SignInRq } from './rqrs/sign-in.rq';
import { CreateUserRq } from './rqrs/create-user.rq';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async signUp(@Body() rq: SignUpRq) {
    return this.userService.signUp(rq);
  }

  @Post('/sign-in')
  async signIn(@Body() rq: SignInRq) {
    return this.userService.signIn(rq);
  }

  @Post('/admin/user') // 비밀번호는 디폴트로 다 동일하게 지정
  async createUser(@Body() rq: CreateUserRq) {
    return this.userService.createUser(rq);
  }
}