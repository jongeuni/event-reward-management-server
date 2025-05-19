import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EVENT_SERVER } from '../common/config/constants';
import {
  CurrentUserHeader,
  RequestHeader,
} from '../common/auth/auth.current-user-header';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { AuthRoleGuard } from '../common/auth/auth-role.guard';
import { UserRole } from '../auth/rqrs/user-role';
import { IdRs } from '../common/rs/id.rs';
import { CreateEventRq } from './rqrs/create-event.rq';
import { ReadEventItemRs } from './rqrs/read-event.item.rs';
import { AddRewardRq } from './rqrs/add-reward.rq';

@ApiBearerAuth('Access-Token')
@ApiTags('Event Controller - 이벤트 생성 및 조회, 보상 추가')
@Controller('/v1')
export class EventGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: '이벤트 목록 조회 API',
    description: '이벤트 목록을 조회합니다. 권한에 따라 목록이 조회됩니다.',
  })
  @ApiResponse({
    status: 200,
    type: [ReadEventItemRs],
  })
  @UseGuards(JwtAuthGuard)
  @Get('/admin/events')
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
  @ApiResponse({ type: IdRs })
  @AuthRoleGuard(UserRole.ADMIN)
  @Post('/admin/events')
  async createEvent(
    @Body() rq: CreateEventRq,
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
    @Body() rq: AddRewardRq,
    @CurrentUserHeader() headers: RequestHeader,
  ) {
    await firstValueFrom(
      this.httpService.post(
        `${EVENT_SERVER}/admin/events/${eventId}/rewords`,
        rq,
        {
          headers,
        },
      ),
    );
  }
}
