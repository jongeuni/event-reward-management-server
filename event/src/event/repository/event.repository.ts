import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '../schema/event';
import { EventCreateDto, EventRewardDto } from '../dto/event-create.dto';
import { toObjectId } from '../../common/util/object-id';
import { EventReward } from '../schema/event-reward';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name) readonly eventModel: Model<EventDocument>,
  ) {}

  async save(dto: EventCreateDto, userId: string): Promise<Event> {
    return this.eventModel.create(new Event(dto, toObjectId(userId)));
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().lean().exec();
  }

  async findPublic(): Promise<Event[]> {
    return this.eventModel.find({ isPrivate: false }).lean().exec();
  }

  async addRewardByEventId(eventId: string, dtos: EventRewardDto[]) {
    const rewards = dtos.map((dto) => {
      return new EventReward(dto);
    });
    await this.eventModel.updateOne(
      { _id: toObjectId(eventId) },
      {
        $push: {
          rewards: {
            $each: rewards,
          },
        },
      },
    );
  }
}
