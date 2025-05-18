import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemDocument } from './item.schema';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectModel(Event.name)
    readonly itemModel: Model<ItemDocument>,
  ) {}
}
