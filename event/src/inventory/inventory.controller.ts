import { Controller, Get } from '@nestjs/common';
import {
  CurrentUser as CurrentUserType,
  CurrentUser,
} from '../common/user/current-user';
import { InventoryService } from './inventory.service';

@Controller('/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async readInventory(@CurrentUser() user: CurrentUserType) {
    return this.inventoryService.readInventory(user.userId);
  }
}
