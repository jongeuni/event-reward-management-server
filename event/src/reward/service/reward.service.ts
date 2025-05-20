import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventRepository } from '../../event/repository/event.repository';
import { EventConditionStrategy } from './strategy/event-condition.strategy';
import { SuccessRs } from '../../common/rs/success.rs';
import {
  EventRewardType,
  getEventConditionMean,
} from '../../event/schema/event.type';
import { EventReward } from '../../event/schema/event-reward';
import { RewardLogRepository } from '../repository/reward-log.repository';
import { WalletRepository } from '../../user-wallet/repository/wallet.repository';
import { RewardRequestLog } from '../schema/reward-log';
import { EventRewardLogRs } from '../rqrs/event-reward-log.rs';
import { InventoryRepository } from '../../inventory/repository/inventory.repository';
import { ItemRepository } from '../../item/repository/item.repository';
import { TitleRepository } from '../../title/repository/title.repository';

@Injectable()
export class RewardService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly rewardLogRepository: RewardLogRepository,
    private readonly walletRepository: WalletRepository,
    private readonly inventoryRepository: InventoryRepository,
    private readonly itemRepository: ItemRepository,
    private readonly titleRepository: TitleRepository,
    @Inject('REWARD_STRATEGIES')
    private readonly strategies: EventConditionStrategy[],
  ) {}

  async rewardCheck(userId: string, eventId: string): Promise<SuccessRs> {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new NotFoundException('이벤트를 찾을 수 없습니다.');
    }

    if (await this.rewardLogRepository.successLogCheck(eventId, userId)) {
      throw new BadRequestException('이미 참여한 이벤트입니다.');
    }

    for (const condition of event.conditions) {
      const strategy = this.strategies.find((s) => s.supports(condition.type));
      if (!strategy) {
        throw new NotFoundException(
          `올바른 이벤트 조건이 아닙니다. 이벤트 타입: ${condition.type}`,
        );
      }

      const checked = await strategy.check(
        userId,
        condition,
        event.startedAt,
        event.endedAt,
      );

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
    event.rewards.forEach((reward) => {
      this.rewardPayment(userId, eventId, reward);
    });

    return new SuccessRs();
  }

  async rewardPayment(userId: string, eventId: string, reward: EventReward) {
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
        );
        break;

      case EventRewardType.CASH:
        await this.walletRepository.addCashFromEvent(
          userId,
          reward.cash ?? 0,
          eventId,
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
