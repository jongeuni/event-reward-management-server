import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EVENT_SERVER } from '../common/constants/constants';
import {
  CurrentUserHeader,
  RequestHeader,
} from '../common/auth/auth.current-user-header';
import { SuccessRs } from '../common/rs/success.rs';
import { ReadRewardRequestItemRs } from './rqrs/read-reward-request.item.rs';
import { JwtAuthGuard } from '../common/auth/guard/jwt-auth.guard';
import { AuthRoleGuard } from '../common/auth/guard/auth-role.guard';
import { UserRole } from '../auth/rqrs/user-role';

@ApiBearerAuth('Access-Token')
@ApiTags('Reward Controller - 보상 요청 및 조회')
@Controller('/v1')
export class RewardGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({
    summary: '보상 요청 API',
    description: '이벤트에 대한 보상을 요청합니다.',
  })
  @ApiNotFoundResponse({
    description: '이벤트를 찾을 수 없습니다.',
  })
  @ApiBadRequestResponse({
    description: '이미 참여한 이벤트입니다.',
  })
  @ApiResponse({ type: SuccessRs })
  @UseGuards(JwtAuthGuard)
  @Post('/events/{:eventId}/rewards')
  async requestReward(
    @Param('eventId') eventId: string,
    @CurrentUserHeader() headers: RequestHeader,
  ) {
    console.log(headers.role + headers.user_id);
    const response = await firstValueFrom(
      this.httpService.post<SuccessRs>(
        `${EVENT_SERVER}/events/${eventId}/rewards`,
        {},
        { headers },
      ),
    );
    return response.data;
  }

  @ApiOperation({
    summary: '보상 요청 조회 API',
    description: '로그인한 사용자의 이벤트 보상 요청 목록을 조회합니다.',
  })
  @ApiResponse({ type: [ReadRewardRequestItemRs] })
  @UseGuards(JwtAuthGuard)
  @Get('/events/rewards')
  async readRewardRequestList(@CurrentUserHeader() headers: RequestHeader) {
    const response = await firstValueFrom(
      this.httpService.get<ReadRewardRequestItemRs[]>(
        `${EVENT_SERVER}/events/rewards`,
        { headers },
      ),
    );
    return response.data;
  }

  @ApiOperation({
    summary: '[어드민] 전체 보상 요청 조회 API',
    description: '전체 보상 요청 목록을 조회합니다.',
  })
  @ApiQuery({ name: 'startedAt', required: false, type: String })
  @ApiQuery({ name: 'endedAt', required: false, type: String })
  @ApiResponse({ type: [ReadRewardRequestItemRs] })
  @AuthRoleGuard(UserRole.ADMIN, UserRole.AUDITOR, UserRole.OPERATOR)
  @Get('/admin/events/rewards')
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
        `${EVENT_SERVER}/admin/events/rewards`,
        { headers, params },
      ),
    );
    return response.data;
  }
}
