import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  CurrentUser as CurrentUserType,
  CurrentUser,
} from '../common/user/current-user';
import { ItemService } from './service/item.service';
import { ItemCreateRq } from './rqrs/item-create.rq';
import { IdRs } from '../common/rqrs/Id.rs';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/user/item/{:itemId}')
  async itemPurchase(
    @CurrentUser() user: CurrentUserType,
    @Param() itemId: string,
  ): Promise<void> {
    // return this.rewardService.rewardCheck(user.userId, eventId);
  }

  @Post('/item')
  async createItem(
    @CurrentUser() user: CurrentUserType,
    @Body() rq: ItemCreateRq,
  ): Promise<IdRs> {
    return this.itemService.createItem(user.userId, rq);
  }
}
