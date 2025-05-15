import { Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/v1/accounts')
export class AccountGatewayController {
  constructor(
    @Inject('ACCOUNT_SERVICE') private accountService: ClientProxy,
    @Inject('PRODUCT_SERVICE') private productService: ClientProxy,
  ) {}

  @Post()
  handleUserRequests(@Req() req: Request) {
    return this.accountService.send({ cmd: 'create-account' }, req.body);
  }
}
