import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '../schema/event';
import { EventCreateDto } from '../dto/event-create.dto';
import { toObjectId } from '../../common/util/object-id';

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

  async findAllByUserId(userId: string): Promise<Event[]> {
    return this.eventModel
      .find({ userId: toObjectId(userId) })
      .lean()
      .exec();
  }
}
