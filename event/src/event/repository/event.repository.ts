import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '../schema/event';
import { EventCreateDto, EventRewardDto } from '../dto/event-create.dto';
import { toObjectId } from '../../common/util/object-id';
import { EventReward } from '../schema/event-reward';
import {
  EventItemReadDto,
  toEventItemReadDto,
} from '../dto/event-item-read.dto';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name) readonly eventModel: Model<EventDocument>,
  ) {}

  async save(dto: EventCreateDto, userId: string): Promise<Event> {
    return this.eventModel.create(new Event(dto, toObjectId(userId)));
  }

  async findById(eventId: string): Promise<Event | null> {
    return this.eventModel.findById(toObjectId(eventId)).lean().exec();
  }
  async findAll(): Promise<Event[]> {
    return this.eventModel.find().lean().exec();
  }

  async findPublic(): Promise<EventItemReadDto[]> {
    const events = await this.eventModel
      .find({ isPrivate: false })
      .populate({ path: 'rewards.itemId', select: 'title', model: 'Item' })
      .populate({ path: 'rewards.titleId', select: 'name', model: 'Title' })
      .lean()
      .exec();

    return events.map(toEventItemReadDto);
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
