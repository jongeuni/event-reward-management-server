import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
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
import { AuthRoleGuard } from '../common/auth/auth-role.guard';
import { UserRole } from '../auth/rqrs/user-role';
import { CreateItemRq } from './rqrs/create-item.rq';
import { IdRs } from '../common/rs/id.rs';

@Controller('/v1')
export class ItemGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: '아이템 구매 API',
    description: '아이템을 구매합니다.',
  })
  @Post('/items/{:itemId}')
  @UseGuards(JwtAuthGuard)
  async requestReward(
    @Param('itemId') itemId: string,
    @CurrentUserHeader() headers: RequestHeader,
  ) {
    await firstValueFrom(
      this.httpService.post<SuccessRs>(`${EVENT_SERVER}/items/${itemId}`, {
        headers,
      }),
    );
  }

  @ApiOperation({
    summary: '[어드민] 아이템 생성 API',
    description: '아이템을 생성(등록)합니다.',
  })
  @AuthRoleGuard(UserRole.ADMIN)
  @Post('/admin/items')
  async createItem(
    @Body() rq: CreateItemRq,
    @CurrentUserHeader() headers: RequestHeader,
  ) {
    const response = await firstValueFrom(
      this.httpService.post<IdRs[]>(`${EVENT_SERVER}/admin/item`, rq, {
        headers,
      }),
    );
    return response.data;
  }
}
