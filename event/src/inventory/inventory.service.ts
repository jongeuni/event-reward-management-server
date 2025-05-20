import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './repository/inventory.repository';
import { ReadInventoryRs } from './rqrs/read-inventory.rs';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  // TODO
  async readInventory(userId: string): Promise<ReadInventoryRs | null> {
    return this.inventoryRepository.findByUserId(userId);
  }
}
