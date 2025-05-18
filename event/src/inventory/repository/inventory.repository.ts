import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, InventoryDocument } from '../schema/inventory.schema';

@Injectable()
export class InventoryRepository {
  constructor(
    @InjectModel(Inventory.name)
    readonly inventoryModel: Model<InventoryDocument>,
  ) {}
}
