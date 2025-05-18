import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItemRepository } from '../repository/item.repository';
import { ItemCreateRq } from '../rqrs/item-create.rq';
import { Item } from '../schema/item.schema';
import { IdRs } from '../../common/rqrs/Id.rs';
import { WalletRepository } from '../../user-wallet/rqrs/repository/wallet.repository';
import { InventoryRepository } from '../../inventory/repository/inventory.repository';
import { UserWallet } from '../../user-wallet/schema/wallet.schema';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly walletRepository: WalletRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async createItem(userId: string, rq: ItemCreateRq): Promise<IdRs> {
    const item: Item = await this.itemRepository.create(userId, rq);
    return {
      id: item._id.toString(),
    };
  }

  // TODO 동시성 제어 트랜잭셔널
  async buyItem(userId: string, itemId: string) {
    const item = await this.itemRepository.findById(itemId);
    if (!item) {
      throw new NotFoundException('해당하는 아이템을 찾을 수 없습니다.');
    }

    const wallet: UserWallet | null =
      await this.walletRepository.findByUserId(userId);

    if (!wallet || wallet.balance < item.price) {
      throw new BadRequestException('캐쉬 충전이 필요합니다.');
    }

    await this.walletRepository.minusCashFromItem(userId, itemId, item.price);

    await this.inventoryRepository.updateItem(userId, itemId);
  }
}