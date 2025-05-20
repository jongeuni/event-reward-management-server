import { Test } from '@nestjs/testing';
import { RewardService } from '../src/reward/service/reward.service';
import { EventRepository } from '../src/event/repository/event.repository';
import { RewardLogRepository } from '../src/reward/repository/reward-log.repository';
import { WalletRepository } from '../src/user-wallet/repository/wallet.repository';
import { InventoryRepository } from '../src/inventory/repository/inventory.repository';
import { ItemRepository } from '../src/item/repository/item.repository';
import { TitleRepository } from '../src/title/repository/title.repository';
import { EventCondition } from '../src/event/schema/event-condition';
import {
  EventConditionType,
  EventRewardType,
} from '../src/event/schema/event.type';
import { EventReward } from '../src/event/schema/event-reward';
import { toObjectId } from '../src/common/util/object-id';

describe('이벤트 조건에 따른 보상 지급 테스트', () => {
  let service: RewardService;

  const userId = 'user_id';
  const eventId = 'event_id';

  const mockEvent = (
    conditions: EventCondition[] = [],
    rewards: EventReward[] = [],
  ) => ({
    _id: eventId,
    conditions,
    rewards,
    startedAt: new Date('2024-01-01'),
    endedAt: new Date('2024-12-31'),
  });

  const createMockStrategy = (result: boolean) => ({
    supports: jest.fn().mockReturnValue(true),
    check: jest.fn().mockResolvedValue(result),
  });

  const commonMocks = {
    eventRepository: { findById: jest.fn() },
    rewardLogRepository: {
      successLogCheck: jest.fn().mockResolvedValue(false),
      createLog: jest.fn(),
    },
    walletRepository: { addCashFromEvent: jest.fn() },
    inventoryRepository: {
      updateItem: jest.fn(),
      updateTitle: jest.fn(),
    },
    itemRepository: { existsById: jest.fn().mockResolvedValue(false) },
    titleRepository: { existsById: jest.fn().mockResolvedValue(false) },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        RewardService,
        { provide: EventRepository, useValue: commonMocks.eventRepository },
        {
          provide: RewardLogRepository,
          useValue: commonMocks.rewardLogRepository,
        },
        { provide: WalletRepository, useValue: commonMocks.walletRepository },
        {
          provide: InventoryRepository,
          useValue: commonMocks.inventoryRepository,
        },
        { provide: ItemRepository, useValue: commonMocks.itemRepository },
        { provide: TitleRepository, useValue: commonMocks.titleRepository },
        { provide: 'REWARD_STRATEGIES', useValue: [] }, // 각 조건에 따라 할당
      ],
    }).compile();

    service = module.get<RewardService>(RewardService);
  });

  describe('출석 조건', () => {
    it('조건 만족: 보상 지급', async () => {
      const strategy = createMockStrategy(true);
      const event = mockEvent(
        [{ type: EventConditionType.ATTENDANCE, days: 3 }],
        [{ type: EventRewardType.CASH, cash: 1000 }],
      );

      commonMocks.eventRepository.findById.mockResolvedValue(event);
      (service as any).strategies = [strategy];

      const res = await service.rewardCheck(userId, eventId);
      expect(res.success).toBe(true);
      expect(commonMocks.walletRepository.addCashFromEvent).toHaveBeenCalled();
    });

    it('조건 불만족: 보상 미지급', async () => {
      const strategy = createMockStrategy(false);
      const event = mockEvent([{ type: EventConditionType.ATTENDANCE }]);

      commonMocks.eventRepository.findById.mockResolvedValue(event);
      (service as any).strategies = [strategy];

      const res = await service.rewardCheck(userId, eventId);
      expect(res.success).toBe(false);
      expect(
        commonMocks.walletRepository.addCashFromEvent,
      ).not.toHaveBeenCalled();
    });
  });

  describe('캐시 사용 조건', () => {
    it('조건 만족: 보상 지급', async () => {
      const strategy = createMockStrategy(true);
      const event = mockEvent(
        [{ type: EventConditionType.USE_CASH }],
        [{ type: EventRewardType.CASH, cash: 5000 }],
      );

      commonMocks.eventRepository.findById.mockResolvedValue(event);
      (service as any).strategies = [strategy];

      const res = await service.rewardCheck(userId, eventId);
      expect(res.success).toBe(true);
      expect(commonMocks.walletRepository.addCashFromEvent).toHaveBeenCalled();
    });

    it('조건 불만족: 보상 미지급', async () => {
      const strategy = createMockStrategy(false);
      const event = mockEvent([{ type: EventConditionType.USE_CASH }]);

      commonMocks.eventRepository.findById.mockResolvedValue(event);
      (service as any).strategies = [strategy];

      const res = await service.rewardCheck(userId, eventId);
      expect(res.success).toBe(false);
      expect(
        commonMocks.walletRepository.addCashFromEvent,
      ).not.toHaveBeenCalled();
    });
  });

  describe('아이템 구매 조건', () => {
    it('조건 만족: 보상 지급', async () => {
      const strategy = createMockStrategy(true);
      const event = mockEvent(
        [{ type: EventConditionType.ITEM_PURCHASE }],
        [
          {
            type: EventRewardType.ITEM,
            itemId: toObjectId('682afd6aa7323c833413d7b1'),
          },
        ],
      );

      commonMocks.eventRepository.findById.mockResolvedValue(event);
      (service as any).strategies = [strategy];

      const res = await service.rewardCheck(userId, eventId);
      expect(res.success).toBe(true);
      expect(commonMocks.inventoryRepository.updateItem).toHaveBeenCalled();
    });

    it('조건 불만족: 보상 미지급', async () => {
      const strategy = createMockStrategy(false);
      const event = mockEvent([{ type: EventConditionType.ITEM_PURCHASE }]);

      commonMocks.eventRepository.findById.mockResolvedValue(event);
      (service as any).strategies = [strategy];

      const res = await service.rewardCheck(userId, eventId);
      expect(res.success).toBe(false);
      expect(commonMocks.inventoryRepository.updateItem).not.toHaveBeenCalled();
    });
  });
});