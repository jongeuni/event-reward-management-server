import { Body, Controller, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SignInRs } from './rqrs/sign-in.rs';
import { ApiOperation } from '@nestjs/swagger';
import { ChargeCashRq } from './rqrs/charge-cash.rq';
import { EVENT_SERVER } from '../common/config/constants';

@Controller('/v1/auth')
export class AuthGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: '캐쉬 충전 API',
    description: '사용자 캐쉬를 충전합니다.',
  })
  @Post()
  async chargeCash(@Body() rq: ChargeCashRq) {
    const response = await firstValueFrom(
      this.httpService.post<SignInRs>(`${EVENT_SERVER}/wallet/charge`, rq),
    );
    return response.data;
  }
}
