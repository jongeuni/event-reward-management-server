import { Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountCreateRq } from '@model/user/account-create.rq';

@Controller('/v1/accounts')
export class AccountGatewayController {
  constructor(
    @Inject('ACCOUNT_SERVICE') private accountService: ClientProxy,
    @Inject('PRODUCT_SERVICE') private productService: ClientProxy,
  ) {}

  @Post()
  handleAccountCreate(@Req() req: AccountCreateRq): any {
    return this.accountService.send({ cmd: 'create-account' }, req);
  }
}
