import { Injectable, Scope } from '@nestjs/common';
import { EventRepository } from '../repository/event.repository';
import { EventCreateRq } from '../rqrs/event-create.rq';
import { IdRs } from '../../common/rqrs/Id.rs';
import { EventCreateDto } from '../dto/event-create.dto';
import {
  AllEventItemRs,
  EventConditionRs,
  EventRewordRs,
} from '../rqrs/all-event-item.rs';
import { EventCondition } from '../schema/event-condition';
import { EventReward } from '../schema/event-reward';
import { UserRole } from '../../common/user/current-user';
import { AddRewardRq } from '../rqrs/add-reward.rq';

@Injectable({ scope: Scope.REQUEST })
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
    const events =
      role == 'USER'
        ? await this.eventRepository.findPublic()
        : await this.eventRepository.findAll();

    return events.map((event) => {
      return new AllEventItemRs(
        event._id.toString(),
        event.title,
        event.description ? event.description : null,
        event.startedAt,
        event.endedAt ? event.endedAt : null,
        event.isPrivate,
        this.toConditionsRs(event.conditions),
        this.toRewordsRs(event.rewards),
      );
    });
  }

  private toConditionsRs(conditions: EventCondition[]) {
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

  private toRewordsRs(rewards: EventReward[]) {
    return rewards.map((reward) => {
      return new EventRewordRs(
        reward.type,
        reward.itemId?.toString(),
        reward.cash,
        reward.titleId?.toString(),
      );
    });
  }

  async addRewords(eventId: string, rewords: AddRewardRq[]) {
    await this.eventRepository.addRewardByEventId(eventId, rewords);
  }
}
