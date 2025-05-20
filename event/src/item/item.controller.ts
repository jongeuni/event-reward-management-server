import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  CurrentUser as CurrentUserType,
  CurrentUser,
} from '../common/auth/current-user';
import { ItemService } from './service/item.service';
import { CreateItemRq } from './rqrs/create-item.rq';
import { IdRs } from '../common/rs/Id.rs';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/items/:itemId')
  async itemPurchase(
    @CurrentUser() user: CurrentUserType,
    @Param('itemId') itemId: string,
  ): Promise<void> {
    await this.itemService.buyItem(user.userId, itemId);
  }

  @Post('/admin/item')
  async createItem(
    @CurrentUser() user: CurrentUserType,
    @Body() rq: CreateItemRq,
  ): Promise<IdRs> {
    return this.itemService.createItem(user.userId, rq);
  }
}
