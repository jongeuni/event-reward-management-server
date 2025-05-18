import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChargeCashRq } from './rqrs/charge-cash.rq';
import { UseCashRq } from './rqrs/use-cash.rq';

@Controller('/wallet')
export class WalletController {
  // 캐쉬 사용 (예: 아이템 구매, 조건 만족용)
  @Post('/use')
  async useCash(@Body() rq: UseCashRq) {}

  // ✅ 캐쉬 충전 (관리자 지급, 유료 결제 후 콜백 등 (캐쉬 지급 타입 필요))
  @Post('/charge')
  async chargeCash(@Body() rq: ChargeCashRq) {}

  // ✅ 전체 캐쉬 내역 조회 (선택)
  @Get('/logs')
  async getCashLogs() {}
}
