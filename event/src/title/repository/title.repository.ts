import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Title, TitleDocument } from '../title.schema';
import { toObjectId } from '../../common/util/object-id';

@Injectable()
export class TitleRepository {
  constructor(
    @InjectModel(Title.name)
    readonly titleModel: Model<TitleDocument>,
  ) {}

  async existsById(titleId: string) {
    return this.titleModel.exists({ _id: toObjectId(titleId) }).exec();
  }
}