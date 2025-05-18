import { Injectable, Scope } from '@nestjs/common';
import { EventRepository } from '../repository/event.repository';

@Injectable({ scope: Scope.REQUEST })
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}
}