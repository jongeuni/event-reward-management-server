import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from '../schema/event';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name)
    readonly eventModel: Model<EventDocument>,
  ) {}
}
