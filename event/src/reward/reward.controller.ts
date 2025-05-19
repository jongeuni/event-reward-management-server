import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  CurrentUser as CurrentUserType,
  CurrentUser,
} from '../common/user/current-user';
import { RewardService } from './service/reward.service';
import { SuccessRs } from '../common/rqrs/success.rs';

@Controller()
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post('/events/{:eventId}/rewards') // 보상 요청 API
  async requestReward(
    @CurrentUser() user: CurrentUserType,
    @Param('eventId') eventId: string,
  ): Promise<SuccessRs> {
    return this.rewardService.rewardCheck(user.userId, eventId);
  }

  @Get('/admin/events/rewards') // 보상 요청 조회 API
  async readRewardsRequest(
    @Query('startedAt') startedAt?: Date,
    @Query('endedAt') endedAt?: Date,
  ) {
    return this.rewardService.readAllEventRewardLog(startedAt, endedAt);
  }

  @Get('/events/rewards') // 보상 요청 조회 API
  async readRewards(@CurrentUser() user: CurrentUserType) {
    return this.rewardService.readAllByUserId(user.userId);
  }
}
