import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from '../../event/repository/event.repository';
import { RewardConditionStrategy } from './strategy/reward-condition.strategy';
import { SuccessRs } from '../../common/rqrs/success.rs';
import {
  EventRewardType,
  getEventConditionMean,
} from '../../event/schema/event.type';
import { EventReward } from '../../event/schema/event-reward';
import { RewardLogRepository } from '../repository/reward-log.repository';
import { WalletRepository } from '../../user-wallet/rqrs/repository/wallet.repository';

@Injectable()
export class RewardService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly rewardLogRepository: RewardLogRepository,
    private readonly walletRepository: WalletRepository,
    @Inject('REWARD_STRATEGIES')
    private readonly strategies: RewardConditionStrategy[],
  ) {}

  // TODO 트랜잭셔널, 동시성 제어
  async rewardCheck(userId: string, eventId: string): Promise<SuccessRs> {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new NotFoundException('이벤트를 찾을 수 없습니다.');
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
    event.rewards.forEach((reward) => {
      this.reward(userId, eventId, reward);
    });

    return new SuccessRs();
  }

  async reward(userId: string, eventId: string, reward: EventReward) {
    switch (reward.type) {
      case EventRewardType.ITEM:
        // itemId로 아이템 찾아오기
        // 유저아이템 도큐먼트에... 넣기 (만들어야 한다) - 유저 상자? 배낭? 그런거 만들어서 title이랑 같이 넣어두기
        // 일단 미구현
        // 요청 성공 로그 찍기
        break;

      case EventRewardType.CASH:
        await this.walletRepository.addCashFromEvent(
          userId,
          reward.cash ?? 0,
          eventId,
        );
        break;

      case EventRewardType.TITLE:
        // 유저 배낭에 title 넣기
        // 요청 성공 로그 찍기
        break;
    }

    await this.rewardLogRepository.createLog(
      eventId,
      userId,
      reward.type,
      true,
    );
  }
}
