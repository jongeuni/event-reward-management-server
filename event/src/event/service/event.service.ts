import { Injectable, Scope } from '@nestjs/common';
import { EventRepository } from '../repository/event.repository';
import { EventCreateRq } from '../rqrs/event-create.rq';
import { IdRs } from '../../common/rqrs/Id.rs';
import { EventCreateDto } from '../dto/event-create.dto';

@Injectable({ scope: Scope.REQUEST })
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async createEvent(rq: EventCreateRq): Promise<IdRs> {
    const userId: string = '66679e9e54711517579556f3';
    const event = await this.eventRepository.save(
      EventCreateDto.from(rq),
      userId,
    );
    return {
      id: event._id.toString(),
    };
  }
}
