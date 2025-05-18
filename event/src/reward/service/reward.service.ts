import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from '../../event/repository/event.repository';
import { RewardConditionStrategy } from './strategy/reward-condition.strategy';

@Injectable()
export class RewardService {
  constructor(
    private readonly eventRepository: EventRepository,
    @Inject('REWARD_STRATEGIES')
    private readonly strategies: RewardConditionStrategy[],
  ) {}

  async rewardCheck(userId: string, eventId: string) {
    const event = await this.eventRepository.findById(eventId); // 가정

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

      await strategy.check(userId, condition);
    }
  }
}
