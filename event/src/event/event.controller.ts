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

  @Get('/admin/event-list')
  async readAllEventList(): Promise<AllEventItemRs[]> {
    return this.eventService.readAllEventList();
  }

  @Get('event-list')
  async readEventList(@CurrentUser() user: CurrentUserType) {}

  @Patch('admin/event/reword')
  async updateRewords(@Body() rq: any) {}
}