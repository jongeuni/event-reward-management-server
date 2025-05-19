import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ApiOperation } from '@nestjs/swagger';
import { EVENT_SERVER } from '../common/config/constants';
import {
  CurrentUserHeader,
  RequestHeader,
} from '../common/auth/auth.current-user-header';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { AuthRoleGuard } from '../common/auth/auth-role.guard';
import { UserRole } from '../auth/rqrs/user-role';
import { IdRs } from '../common/rs/id.rs';
import { EventCreateRq } from './rqrs/create-event.rq';
import { ReadEventItemRs } from './rqrs/read-event.item.rs';

@Controller('/v1')
export class EventGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: '이벤트 목록 조회 API',
    description: '이벤트 목록을 조회합니다. 권한에 따라 목록이 조회됩니다.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/admin/events')
  async readEventList(@CurrentUserHeader() headers: RequestHeader) {
    const response = await firstValueFrom(
      this.httpService.get<ReadEventItemRs[]>(`${EVENT_SERVER}/events`, {
        headers,
      }),
    );
    return response.data;
  }

  @ApiOperation({
    summary: '[어드민] 이벤트 생성 API',
    description: '이벤트를 생성합니다.',
  })
  @AuthRoleGuard(UserRole.ADMIN)
  @Post('/admin/events')
  async createEvent(
    @Body() rq: EventCreateRq,
    @CurrentUserHeader() headers: RequestHeader,
  ) {
    const response = await firstValueFrom(
      this.httpService.post<IdRs[]>(`${EVENT_SERVER}/admin/events`, rq, {
        headers,
      }),
    );
    return response.data;
  }

  @ApiOperation({
    summary: '[어드민] 이벤트에 보상 추가 API',
    description: '이벤트에 보상을 추가합니다.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/admin/events/{:eventId}/rewords')
  async addReword(
    @Param('eventId') eventId: string,
    @CurrentUserHeader() headers: RequestHeader,
  ) {
    await firstValueFrom(
      this.httpService.get<ReadEventItemRs[]>(
        `${EVENT_SERVER}/admin/events/${eventId}/rewords`,
        {
          headers,
        },
      ),
    );
  }
}
