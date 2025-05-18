import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryRepositoryModule } from './repository/inventory.repository.module';

@Module({
  imports: [InventoryRepositoryModule],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
