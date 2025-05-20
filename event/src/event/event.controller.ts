import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from './service/event.service';
import { CreateEventRq } from './rqrs/create-event.rq';
import { IdRs } from '../common/rs/Id.rs';
import { AllEventItemRs } from './rqrs/all-event-item.rs';
import {
  CurrentUser,
  CurrentUser as CurrentUserType,
} from '../common/auth/current-user';
import { AddRewardRq } from './rqrs/add-reward.rq';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/admin/events')
  async createEvent(
    @CurrentUser() user: CurrentUserType,
    @Body() rq: CreateEventRq,
  ): Promise<IdRs> {
    return this.eventService.createEvent(rq, user.userId);
  }

  @Get('/events')
  async readAllEventList(
    @CurrentUser() user: CurrentUserType,
  ): Promise<AllEventItemRs[]> {
    return this.eventService.readAllEventList(user.role);
  }

  @Post('/admin/events/{:eventId}/rewords')
  async addRewords(
    @Param('eventId') eventId: string,
    @Body() rq: AddRewardRq[],
  ) {
    // 추후엔 보상 추가 시 이미 받은 유저들에게 추가된 보상을 지급하는 로직이 필요할듯!!
    await this.eventService.addRewards(eventId, rq);
  }
}