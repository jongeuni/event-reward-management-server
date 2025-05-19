import { Body, Controller, Post } from '@nestjs/common';
import { ChargeCashRq } from './rqrs/charge-cash.rq';
import { WalletService } from './wallet.service';
import {
  CurrentUser as CurrentUserType,
  CurrentUser,
} from '../common/user/current-user';

@Controller('/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // 캐쉬 충전
  // 응답값으로 현재 잔액
  @Post('/charge')
  async chargeCash(
    @CurrentUser() user: CurrentUserType,
    @Body() rq: ChargeCashRq,
  ) {
    return this.walletService.chargeCash(user.userId, rq.amount);
  }
}
