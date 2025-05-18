import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../repository/item.repository';

@Injectable()
export class ItemService {
  async;

  constructor(private readonly itemRepository: ItemRepository) {}
}