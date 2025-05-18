import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from '../../event/repository/event.repository';
import { RewardConditionStrategy } from './strategy/reward-condition.strategy';
import { SuccessRs } from '../../common/rqrs/success.rs';
import { getEventConditionMean } from '../../event/schema/event.type';

@Injectable()
export class RewardService {
  constructor(
    private readonly eventRepository: EventRepository,
    @Inject('REWARD_STRATEGIES')
    private readonly strategies: RewardConditionStrategy[],
  ) {}

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
        return new SuccessRs(
          false,
          `이벤트 조건을 만족하지 않습니다 - ${getEventConditionMean(condition.type)} 조건 불만족`,
        );
      }
    }

    // 보상 지급 로직

    return new SuccessRs();
  }
}
