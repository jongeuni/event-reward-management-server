import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Inventory, InventoryDocument } from '../schema/inventory.schema';
import { toObjectId } from '../../common/util/object-id';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectModel(Inventory.name)
    readonly inventoryModel: Model<InventoryDocument>,
  ) {}

  async updateItem(userId: string, itemId: string, session?: ClientSession) {
    await this.inventoryModel
      .updateOne(
        { userId: toObjectId(userId) },
        { $push: { itemId: toObjectId(itemId) } },
        { upsert: true },
      )
      .session(session ?? null)
      .exec();
  }

  async updateTitle(userId: string, titleId: string, session?: ClientSession) {
    await this.inventoryModel
      .updateOne(
        { userId: toObjectId(userId) },
        { $addToSet: { titleId: toObjectId(titleId) } },
        { upsert: true },
      )
      .session(session ?? null)
      .exec();
  }
}
