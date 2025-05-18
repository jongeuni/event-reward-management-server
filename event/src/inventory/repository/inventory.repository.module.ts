import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from '../schema/inventory.schema';
import { InventoryRepository } from './inventory.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
    ]),
  ],
  providers: [InventoryRepository],
  exports: [InventoryRepository],
})
export class InventoryRepositoryModule {}