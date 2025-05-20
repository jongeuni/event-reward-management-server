import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ChargeCashRq } from './rqrs/charge-cash.rq';
import { EVENT_SERVER } from '../common/config/constants';
import {
  CurrentUserHeader,
  RequestHeader,
} from '../common/auth/auth.current-user-header';
import { ChargeCashRs } from './rqrs/charge-cash.rs';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';

@ApiBearerAuth('Access-Token')
@ApiTags('Wallet Controller - 캐쉬 충전')
@Controller('/v1/wallet')
export class WalletGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: '캐시 충전 API',
    description: '사용자 캐시를 충전합니다.',
  })
  @ApiCreatedResponse({
    type: ChargeCashRs,
  })
  @UseGuards(JwtAuthGuard)
  @Post('/charge')
  async chargeCash(
    @Body() rq: ChargeCashRq,
    @CurrentUserHeader() headers: RequestHeader,
  ) {
    const response = await firstValueFrom(
      this.httpService.post<ChargeCashRs>(`${EVENT_SERVER}/wallet/charge`, rq, {
        headers,
      }),
    );
    return response.data;
  }
}
