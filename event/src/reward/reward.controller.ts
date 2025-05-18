import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CurrentUser as CurrentUserType,
  CurrentUser,
} from '../common/user/current-user';
import { RewardService } from './service/reward.service';

@Controller()
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post('/event/{:eventId}/rewords') // 보상 요청 API
  async requestRewords(
    @CurrentUser() user: CurrentUserType,
    @Param('eventId') eventId: string,
  ) {
    await this.rewardService.rewardCheck(user.userId, eventId);
    // event find
    // event 조건 타입 확인
    // 해당하는 조건 확인
    // 조건에 만족하면 이벤트 지급, 만약 만족하지 못한다면 ...
  }

  @Get('admin/event/rewords') // 보상 요청 조회 API
  async readRewordsRequest(@Body() rq: any) {}

  @Get('event/rewords') // 보상 요청 조회 API
  async readRewords(@Body() rq: any) {}
}
