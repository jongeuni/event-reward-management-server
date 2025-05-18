import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { EventService } from './service/event.service';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('admin/event')
  async createEvent(@Body() rq: any) {}

  @Get('admin/event-list')
  async readAllEventList(@Body() rq: any) {}

  @Get('event-list')
  async readEventList(@Body() rq: any) {}

  @Patch('admin/event/reword')
  async updateRewords(@Body() rq: any) {}
}