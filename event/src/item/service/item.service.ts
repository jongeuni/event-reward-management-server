import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../repository/item.repository';
import { ItemCreateRq } from '../rqrs/item-create.rq';
import { Item } from '../schema/item.schema';
import { IdRs } from '../../common/rqrs/Id.rs';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async createItem(userId: string, rq: ItemCreateRq): Promise<IdRs> {
    const item: Item = await this.itemRepository.create(userId, rq);
    return {
      id: item._id.toString(),
    };
  }
}