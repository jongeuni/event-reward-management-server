import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { EventService } from './service/event.service';
import { EventCreateRq } from './rqrs/event-create.rq';
import { IdRs } from '../common/rqrs/Id.rs';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/admin/event')
  async createEvent(@Body() rq: EventCreateRq): Promise<IdRs> {
    return this.eventService.createEvent(rq);
  }

  @Get('admin/event-list')
  async readAllEventList(@Body() rq: any) {}

  @Get('event-list')
  async readEventList(@Body() rq: any) {}

  @Patch('admin/event/reword')
  async updateRewords(@Body() rq: any) {}
}