import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { EventService } from './service/event.service';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/event-list')
  async readEventList(@Body() rq: any) {}

  @Post('/event')
  async createEvent(@Body() rq: any) {}

  @Patch('/event/reword')
  async updateRewords(@Body() rq: any) {}
}