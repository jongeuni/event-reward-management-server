import { Controller, Get } from '@nestjs/common';
import {
  CurrentUser as CurrentUserType,
  CurrentUser,
} from '../common/auth/current-user';
import { InventoryService } from './service/inventory.service';

@Controller('/inventories')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async readInventory(@CurrentUser() user: CurrentUserType) {
    return this.inventoryService.readInventory(user.userId);
  }
}
