import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CurrentUser as CurrentUserType,
  CurrentUser,
} from '../common/user/current-user';
import { RewardService } from './service/reward.service';
import { SuccessRs } from '../common/rqrs/success.rs';

@Controller()
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post('/event/{:eventId}/rewords') // 보상 요청 API
  async requestRewords(
    @CurrentUser() user: CurrentUserType,
    @Param('eventId') eventId: string,
  ): Promise<SuccessRs> {
    return await this.rewardService.rewardCheck(user.userId, eventId);
  }

  @Get('admin/event/rewords') // 보상 요청 조회 API
  async readRewordsRequest(@Body() rq: any) {}

  @Get('event/rewords') // 보상 요청 조회 API
  async readRewords(@Body() rq: any) {}
}
