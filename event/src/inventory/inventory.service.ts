import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './repository/inventory.repository';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async readInventory(userId: string) {}
}
