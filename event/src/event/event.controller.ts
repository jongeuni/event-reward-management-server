import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from './service/event.service';
import { EventCreateRq } from './rqrs/event-create.rq';
import { IdRs } from '../common/rqrs/Id.rs';
import { AllEventItemRs } from './rqrs/all-event-item.rs';
import {
  CurrentUser,
  CurrentUser as CurrentUserType,
} from '../common/user/current-user';
import { AddRewardRq } from './rqrs/add-reward.rq';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/admin/event')
  async createEvent(
    @CurrentUser() user: CurrentUserType,
    @Body() rq: EventCreateRq,
  ): Promise<IdRs> {
    return this.eventService.createEvent(rq, user.userId);
  }

  @Get('/event-list')
  async readAllEventList(
    @CurrentUser() user: CurrentUserType,
  ): Promise<AllEventItemRs[]> {
    return this.eventService.readAllEventList(user.role);
  }

  @Post('/admin/event/{:eventId}/reword')
  async addRewords(
    @Param('eventId') eventId: string,
    @Body() rq: AddRewardRq[],
  ) {
    await this.eventService.addRewords(eventId, rq);
  }
}