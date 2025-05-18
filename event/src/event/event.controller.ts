import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { EventService } from './service/event.service';
import { EventCreateRq } from './rqrs/event-create.rq';
import { IdRs } from '../common/rqrs/Id.rs';
import { AllEventItemRs } from './rqrs/all-event-item.rs';
import {
  CurrentUser,
  CurrentUser as CurrentUserType,
} from '../common/user/current-user';

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

  @Patch('admin/event/reword')
  async updateRewords(@Body() rq: any) {}
}