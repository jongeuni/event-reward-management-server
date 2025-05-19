import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, InventoryDocument } from '../schema/inventory.schema';
import { toObjectId } from '../../common/util/object-id';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectModel(Inventory.name)
    readonly inventoryModel: Model<InventoryDocument>,
  ) {}

  async updateItem(userId: string, itemId: string) {
    await this.inventoryModel
      .updateOne(
        { userId: toObjectId(userId) },
        { $push: { itemId: { id: toObjectId(itemId) } } },
        { upsert: true },
      )
      .exec();
  }

  async updateTitle(userId: string, titleId: string) {
    await this.inventoryModel
      .updateOne(
        { userId: toObjectId(userId) },
        { $addToSet: { titleId: { id: toObjectId(titleId) } } },
        { upsert: true },
      )
      .exec();
  }
}
