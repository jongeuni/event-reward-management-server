import { Controller, Param, Post, Query, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ApiOperation } from '@nestjs/swagger';
import { EVENT_SERVER } from '../common/config/constants';
import {
  CurrentUserHeader,
  RequestHeader,
} from '../common/auth/auth.current-user-header';
import { SuccessRs } from '../common/rs/success.rs';
import { ReadRewardRequestItemRs } from './rqrs/read-reward-request.item.rs';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { AuthRoleGuard } from '../common/auth/auth-role.guard';
import { UserRole } from '../auth/rqrs/user-role';

@Controller('/v1')
export class RewardGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: '보상 요청 API',
    description: '이벤트에 대한 보상을 요청합니다.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/events/{:eventId}/rewards')
  async requestReward(
    @Param('eventId') eventId: string,
    @CurrentUserHeader() headers: RequestHeader,
  ) {
    const response = await firstValueFrom(
      this.httpService.post<SuccessRs>(
        `${EVENT_SERVER}/event/${eventId}/rewards`,
        { headers },
      ),
    );
    return response.data;
  }

  @ApiOperation({
    summary: '보상 요청 조회 API',
    description: '사용자 본인의 이벤트 보상 요청 목록을 조회합니다.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/events/rewards')
  async readRewardRequestList(@CurrentUserHeader() headers: RequestHeader) {
    const response = await firstValueFrom(
      this.httpService.get<ReadRewardRequestItemRs[]>(
        `${EVENT_SERVER}/event/rewards`,
        { headers },
      ),
    );
    return response.data;
  }

  @ApiOperation({
    summary: '[어드민] 전체 보상 요청 조회 API',
    description: '전체 보상 요청 목록을 조회합니다.',
  })
  @Post('/admin/events/rewards')
  @AuthRoleGuard(UserRole.ADMIN)
  async readAllRewardRequestList(
    @CurrentUserHeader() headers: RequestHeader,
    @Query('startedAt') startedAt?: Date,
    @Query('endedAt') endedAt?: Date,
  ) {
    const params = {
      startedAt,
      endedAt,
    };

    const response = await firstValueFrom(
      this.httpService.get<ReadRewardRequestItemRs[]>(
        `${EVENT_SERVER}/admin/event/rewards`,
        { headers, params },
      ),
    );
    return response.data;
  }
}
