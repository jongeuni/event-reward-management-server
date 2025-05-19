import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventRepository } from '../../event/repository/event.repository';
import { EventConditionStrategy } from './strategy/event-condition.strategy';
import { SuccessRs } from '../../common/rqrs/success.rs';
import {
  EventRewardType,
  getEventConditionMean,
} from '../../event/schema/event.type';
import { EventReward } from '../../event/schema/event-reward';
import { RewardLogRepository } from '../repository/reward-log.repository';
import { WalletRepository } from '../../user-wallet/rqrs/repository/wallet.repository';
import { RewardRequestLog } from '../schema/reward-log';
import { EventRewardLogRs } from '../rqrs/event-reward-log.rs';
import { InventoryRepository } from '../../inventory/repository/inventory.repository';
import { ItemRepository } from '../../item/repository/item.repository';
import { TitleRepository } from '../../title/title.repository';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession, Connection } from 'mongoose';

@Injectable()
export class RewardService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly rewardLogRepository: RewardLogRepository,
    private readonly walletRepository: WalletRepository,
    private readonly inventoryRepository: InventoryRepository,
    private readonly itemRepository: ItemRepository,
    private readonly titleRepository: TitleRepository,
    @InjectConnection() private readonly connection: Connection,
    @Inject('REWARD_STRATEGIES')
    private readonly strategies: EventConditionStrategy[],
  ) {}

  async rewardCheck(userId: string, eventId: string): Promise<SuccessRs> {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new NotFoundException('이벤트를 찾을 수 없습니다.');
    }

    if (await this.rewardLogRepository.successLogCheck(eventId, userId)) {
      throw new BadRequestException('이미 진행한 이벤트입니다.');
    }

    for (const condition of event.conditions) {
      const strategy = this.strategies.find((s) => s.supports(condition.type));
      if (!strategy) {
        throw new NotFoundException(
          `올바른 이벤트 조건이 아닙니다. 이벤트 타입: ${condition.type}`,
        );
      }

      const checked = await strategy.check(userId, condition);

      if (!checked) {
        await this.rewardLogRepository.createLog(
          eventId,
          userId,
          EventRewardType.NONE,
          false,
        );

        return new SuccessRs(
          false,
          `이벤트 조건을 만족하지 않습니다 - ${getEventConditionMean(condition.type)} 조건 불만족`,
        );
      }
    }

    // 보상 지급 로직
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      event.rewards.forEach((reward) => {
        this.rewardPayment(userId, eventId, reward, session);
      });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }

    return new SuccessRs();
  }

  async rewardPayment(
    userId: string,
    eventId: string,
    reward: EventReward,
    session: ClientSession,
  ) {
    switch (reward.type) {
      case EventRewardType.ITEM:
        if (
          !reward.itemId ||
          (await this.itemRepository.existsById(reward.itemId.toString()))
        ) {
          throw new NotFoundException(
            '보상에 해당하는 아이템을 찾을 수 없습니다.',
          );
        }
        await this.inventoryRepository.updateItem(
          userId,
          reward.itemId.toString(),
          session,
        );
        break;

      case EventRewardType.CASH:
        await this.walletRepository.addCashFromEvent(
          userId,
          reward.cash ?? 0,
          eventId,
          session,
        );
        break;

      case EventRewardType.TITLE:
        if (
          !reward.titleId ||
          (await this.titleRepository.existsById(reward.titleId.toString()))
        ) {
          throw new NotFoundException(
            '보상에 해당하는 칭호를 찾을 수 없습니다.',
          );
        }
        await this.inventoryRepository.updateTitle(
          userId,
          reward.titleId.toString(),
          session,
        );
        break;
    }

    await this.rewardLogRepository.createLog(
      eventId,
      userId,
      reward.type,
      true,
    );
  }

  async readAllEventRewardLog(
    startedAt?: Date,
    endedAt?: Date,
  ): Promise<EventRewardLogRs[]> {
    const rewardLogs: RewardRequestLog[] =
      await this.rewardLogRepository.findByCreatedAt(startedAt, endedAt);

    return rewardLogs.map((rewardLog) => {
      return new EventRewardLogRs(
        rewardLog.eventId.toString(),
        rewardLog.userId.toString(),
        rewardLog.type,
        rewardLog.isSuccess,
        rewardLog.createdAt,
      );
    });
  }

  async readAllByUserId(userId: string) {
    const rewardLogs: RewardRequestLog[] =
      await this.rewardLogRepository.findByUserId(userId);

    return rewardLogs.map((rewardLog) => {
      return new EventRewardLogRs(
        rewardLog.eventId.toString(),
        rewardLog.userId.toString(),
        rewardLog.type,
        rewardLog.isSuccess,
        rewardLog.createdAt,
      );
    });
  }
}
