import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from '../schema/item.schema';
import { ItemCreateDto } from '../dto/item-create.dto';
import { toObjectId } from '../../common/util/object-id';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectModel(Item.name) readonly itemModel: Model<ItemDocument>,
  ) {}

  async findById(itemId: string): Promise<Item | null> {
    return this.itemModel.findById(toObjectId(itemId)).lean().exec();
  }

  async existsById(itemId: string) {
    return this.itemModel
      .exists({ _id: toObjectId(itemId) })
      .lean()
      .exec();
  }

  async create(userId: string, dto: ItemCreateDto): Promise<Item> {
    return this.itemModel.create({
      title: dto.title,
      description: dto.description,
      version: dto.version,
      effect: {
        type: dto.effectType,
        plusValue: dto.effectPlus,
      },
      price: dto.price,
      createdBy: toObjectId(userId),
    });
  }
}
