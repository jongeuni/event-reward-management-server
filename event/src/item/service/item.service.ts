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
import { ClientSession, Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly walletRepository: WalletRepository,
    private readonly inventoryRepository: InventoryRepository,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async createItem(userId: string, rq: ItemCreateRq): Promise<IdRs> {
    const item: Item = await this.itemRepository.create(userId, rq);
    return {
      id: item._id.toString(),
    };
  }

  async buyItem(userId: string, itemId: string) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const item = await this.findItem(itemId, session);
      await this.walletCheck(userId, item.price, session);
      await this.itemPayment(userId, itemId, item.price, session);
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }

  async findItem(itemId: string, session: ClientSession) {
    const item = await this.itemRepository.findById(itemId, session);
    if (!item) {
      throw new NotFoundException('해당하는 아이템을 찾을 수 없습니다.');
    }

    return item;
  }

  async walletCheck(userId: string, itemPrice: number, session: ClientSession) {
    const wallet: UserWallet | null = await this.walletRepository.findByUserId(
      userId,
      session,
    );

    if (!wallet || wallet.balance < itemPrice) {
      throw new BadRequestException('캐쉬 충전이 필요합니다.');
    }
  }

  async itemPayment(
    userId: string,
    itemId: string,
    itemPrice: number,
    session: ClientSession,
  ) {
    await this.walletRepository.minusCashFromItem(
      userId,
      itemId,
      itemPrice,
      session,
    );

    await this.inventoryRepository.updateItem(userId, itemId, session);
  }
}
