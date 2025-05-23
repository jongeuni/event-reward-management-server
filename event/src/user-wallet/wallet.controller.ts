import { Body, Controller, Post } from '@nestjs/common';
import { ChargeCashRq } from './rqrs/charge-cash.rq';
import { WalletService } from './service/wallet.service';
import {
  CurrentUser as CurrentUserType,
  CurrentUser,
} from '../common/auth/current-user';

@Controller('/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/charge')
  async chargeCash(
    @CurrentUser() user: CurrentUserType,
    @Body() rq: ChargeCashRq,
  ) {
    return this.walletService.chargeCash(user.userId, rq.amount);
  }
}
