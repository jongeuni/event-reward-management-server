import { TitleRepository } from '../title/title.repository';
import { ItemRepository } from '../item/repository/item.repository';
import { EventRepository } from '../event/repository/event.repository';
import {
  EventConditionType,
  EventRewardType,
} from '../event/schema/event.type';
import { INestApplication } from '@nestjs/common';

export async function initDummy(app: INestApplication) {
  const itemRepository = app.get(ItemRepository);
  const titleRepository = app.get(TitleRepository);
  const eventRepository = app.get(EventRepository);

  if (await itemRepository.itemModel.exists({})) {
    console.log('이미 일부 데이터가 존재하므로 더미 데이터 삽입을 건너뜁니다.');
    // await app.close();
    return;
  }

  // item 생성
  const createdItems = await createItemDummy(itemRepository);

  const glassesItem = createdItems.find(
    (item) => item.title === '학급 반장 안경',
  );
  const nudugyItem = createdItems.find((item) => item.title === '누더기옷');

  // title 생성
  const createdTitles = await createTitleDummy(titleRepository);

  const attendanceTitle = createdTitles.find(
    (title) => title.name === '5월의 출석왕',
  );
  const mayKingTitle = createdTitles.find(
    (title) => title.name === '5월의 권위자',
  );
  const whoAmITitle = createdTitles.find(
    (title) => title.name === '내가 왕이 될 상인가',
  );

  const startedAt = new Date();
  startedAt.setFullYear(2025, 4, 1);
  startedAt.setHours(0, 0, 0, 0);

  const endedAt = new Date();
  endedAt.setFullYear(2025, 4, 31);
  endedAt.setHours(23, 59, 59, 999);

  // event 생성
  await eventRepository.eventModel.create({
    title: '5월의 출석왕 이벤트',
    description: '5월 출석을 5번 이상 한 유저에게 보상이 주어집니다.',
    startedAt,
    endedAt,
    conditions: [
      {
        type: EventConditionType.ATTENDANCE,
        days: 5,
      },
    ],
    rewards: [
      {
        type: EventRewardType.TITLE,
        titleId: attendanceTitle?._id,
      },
      {
        type: EventRewardType.ITEM,
        itemId: glassesItem?._id,
      },
    ],
  });

  await eventRepository.eventModel.create({
    title: '5월의 권위자 이벤트',
    description:
      '5월 출석을 5번 이상 하고, 캐쉬를 10000원 이상 사용한 유저에게 보상이 주어집니다.',
    startedAt,
    endedAt,
    conditions: [
      {
        type: EventConditionType.ATTENDANCE,
        days: 5,
      },
      {
        type: EventConditionType.USE_CASH,
        days: 10000,
      },
    ],
    rewards: [
      {
        type: EventRewardType.TITLE,
        titleId: mayKingTitle?._id,
      },
      {
        type: EventRewardType.CASH,
        cash: 3000,
      },
    ],
  });

  await eventRepository.eventModel.create({
    title: '비밀의 아이템을 찾아라!',
    description: '특정 아이템을 찾아서 구매한 유저에게 보상이 주어집니다.',
    startedAt,
    conditions: [
      {
        type: EventConditionType.ITEM_PURCHASE,
        itemId: nudugyItem?._id,
      },
    ],
    rewards: [
      {
        type: EventRewardType.TITLE,
        titleId: whoAmITitle?._id,
      },
    ],
  });

  await app.close();
}

async function createItemDummy(itemRepository: ItemRepository) {
  return itemRepository.itemModel.insertMany([
    {
      title: '멋있는 해골 모자',
      description: '자신감을 더해주는 해골 모자',
      effect: {
        type: 'POWER',
        plusValue: 1,
      },
      price: 2000,
    },
    {
      title: '누더기옷',
      description: '비밀이 숨겨져있는 누더기옷',
      effect: {
        type: 'POWER',
        plusValue: 0,
      },
      price: 50000,
    },
    {
      title: '깜찍한 고양이 귀',
      description: '복실복실 고양이 귀 머리띠',
      effect: {
        type: 'POWER',
        plusValue: 10,
      },
      price: 10000,
    },
    {
      title: '학급 반장 안경',
      description: '빙빙이가 쓰던 안경',
      effect: {
        type: 'POWER',
        plusValue: 3,
      },
      price: 5000,
    },
  ]);
}

async function createTitleDummy(titleRepository: TitleRepository) {
  return titleRepository.titleModel.insertMany([
    {
      name: '5월의 출석왕',
      description: '5월 출석 이벤트 성공 시 주어지는 칭호',
    },
    {
      name: '5월의 권위자',
      description: "이벤트 '5월의 권위자' 조건 달성 시 주어지는 칭호",
    },
    {
      name: '똑똑이',
      description: '똑똑한 유저에게 주어지는 칭호',
    },
    {
      name: '유행의 선도자',
      description: '아이템을 많이 사는 유저에게 주어지는 칭호',
    },
    {
      name: '내가 왕이 될 상인가',
      description: '누더기 시크릿 이벤트 달성 시 주어지는 칭호',
    },
  ]);
}