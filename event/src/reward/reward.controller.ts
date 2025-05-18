import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller()
export class RewardController {
  @Post('/event/rewords') // 보상 요청 API
  async requestRewords(@Body() rq: any) {}

  @Get('admin/event/rewords') // 보상 요청 조회 API
  async readRewordsRequest(@Body() rq: any) {}

  @Get('event/rewords') // 보상 요청 조회 API
  async readRewords(@Body() rq: any) {}
}
