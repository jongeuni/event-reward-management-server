import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItemRepository } from '../repository/item.repository';
import { CreateItemRq } from '../rqrs/create-item.rq';
import { Item } from '../schema/item.schema';
import { IdRs } from '../../common/rs/Id.rs';
import { WalletRepository } from '../../user-wallet/repository/wallet.repository';
import { InventoryRepository } from '../../inventory/repository/inventory.repository';
import { UserWallet } from '../../user-wallet/schema/wallet.schema';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly walletRepository: WalletRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async createItem(userId: string, rq: CreateItemRq): Promise<IdRs> {
    const item: Item = await this.itemRepository.create(userId, rq);
    return {
      id: item._id.toString(),
    };
  }

  async buyItem(userId: string, itemId: string) {
    const item = await this.findItem(itemId);
    await this.walletCheck(userId, item.price);
    await this.itemPayment(userId, itemId, item.price);
  }

  async findItem(itemId: string) {
    const item = await this.itemRepository.findById(itemId);
    if (!item) {
      throw new NotFoundException('해당하는 아이템을 찾을 수 없습니다.');
    }

    return item;
  }

  async walletCheck(userId: string, itemPrice: number) {
    const wallet: UserWallet | null =
      await this.walletRepository.findByUserId(userId);

    if (!wallet || wallet.balance < itemPrice) {
      throw new BadRequestException('캐쉬 충전이 필요합니다.');
    }
  }

  async itemPayment(userId: string, itemId: string, itemPrice: number) {
    await this.walletRepository.minusCashFromItem(userId, itemId, itemPrice);

    await this.inventoryRepository.updateItem(userId, itemId);
  }
}
