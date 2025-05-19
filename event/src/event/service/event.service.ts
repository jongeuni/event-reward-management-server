import { Injectable } from '@nestjs/common';
import { EventRepository } from '../repository/event.repository';
import { EventCreateRq } from '../rqrs/event-create.rq';
import { IdRs } from '../../common/rqrs/Id.rs';
import { EventCreateDto } from '../dto/event-create.dto';
import {
  AllEventItemRs,
  EventConditionRs,
  EventRewordRs,
} from '../rqrs/all-event-item.rs';
import { UserRole } from '../../common/user/current-user';
import { AddRewardRq } from '../rqrs/add-reward.rq';
import {
  EventConditionReadDto,
  EventRewardReadDto,
} from '../dto/event-item-read.dto';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async createEvent(rq: EventCreateRq, userId: string): Promise<IdRs> {
    const event = await this.eventRepository.save(
      EventCreateDto.from(rq),
      userId,
    );
    return {
      id: event._id.toString(),
    };
  }

  async readAllEventList(role: UserRole): Promise<AllEventItemRs[]> {
    const events = await this.eventRepository.findPublic();
    // : await this.eventRepository.findAll();

    console.log(events);

    return events.map((event) => {
      return new AllEventItemRs(
        event.id,
        event.title,
        event.description ? event.description : null,
        event.startedAt,
        event.endedAt ? event.endedAt : null,
        event.isPrivate,
        this.toConditionsRs(event.conditions),
        this.toRewordsRs(event.rewords),
      );
    });
  }

  private toConditionsRs(
    conditions: EventConditionReadDto[],
  ): EventConditionRs[] {
    return conditions.map((condition) => {
      return new EventConditionRs(
        condition.type,
        condition.days,
        condition.cash,
        condition.itemId?.toString(),
        condition.count,
      );
    });
  }

  private toRewordsRs(rewards: EventRewardReadDto[]) {
    return rewards.map((reward) => {
      return new EventRewordRs(
        reward.type,
        reward.item?._id.toString(),
        reward.item?.title,
        reward.cash,
        reward.title?._id.toString(),
        reward.title?.name.toString(),
      );
    });
  }

  async addRewards(eventId: string, rewards: AddRewardRq[]) {
    await this.eventRepository.addRewardByEventId(eventId, rewards);
  }
}
