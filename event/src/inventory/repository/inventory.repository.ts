import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, InventoryDocument } from '../schema/inventory.schema';
import { toObjectId } from '../../common/util/object-id';
import {
  InventoryReadDto,
  toInventoryReadDto,
} from '../dto/inventory-read.dto';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectModel(Inventory.name)
    private readonly inventoryModel: Model<InventoryDocument>,
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

  async findByUserId(userId: string): Promise<InventoryReadDto | null> {
    const inventory = await this.inventoryModel
      .findOne({ userId: toObjectId(userId) })
      .populate({ path: 'itemId.id', model: 'Item' })
      .populate({ path: 'titleId.id', model: 'Title' })
      .lean();

    return toInventoryReadDto(inventory);
  }
}
