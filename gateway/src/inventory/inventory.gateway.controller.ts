import { Controller, Get, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ApiOperation } from '@nestjs/swagger';
import { EVENT_SERVER } from '../common/config/constants';
import {
  CurrentUserHeader,
  RequestHeader,
} from '../common/auth/auth.current-user-header';
import { SuccessRs } from '../common/rs/success.rs';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';

@Controller('/v1/inventories')
export class InventoryGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: '인벤토리 조회 API',
    description: '인벤토리에 있는 아이템들을 조회합니다.',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async readInventory(@CurrentUserHeader() headers: RequestHeader) {
    await firstValueFrom(
      this.httpService.post<SuccessRs>(`${EVENT_SERVER}/inventories`, {
        headers,
      }),
    );
  }
}
