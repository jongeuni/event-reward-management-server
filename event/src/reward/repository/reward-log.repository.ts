import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RewardRequestLog,
  RewardRequestLogDocument,
} from '../schema/reward-log';
import { toObjectId } from '../../common/util/object-id';
import { EventRewardType } from '../../event/schema/event.type';

@Injectable()
export class RewardLogRepository {
  constructor(
    @InjectModel(RewardRequestLog.name)
    private readonly rewordLogModel: Model<RewardRequestLogDocument>,
  ) {}

  async createLog(
    eventId: string,
    userId: string,
    rewardType: EventRewardType,
    isSuccess: boolean,
  ) {
    await this.rewordLogModel.create({
      eventId: toObjectId(eventId),
      userId: toObjectId(userId),
      type: rewardType,
      isSuccess,
    });
  }

  async successLogCheck(eventId: string, userId: string) {
    return this.rewordLogModel.exists({
      eventId: toObjectId(eventId),
      userId: toObjectId(userId),
      isSuccess: true,
    });
  }

  async findByCreatedAt(
    startedAt?: Date,
    endedAt?: Date,
  ): Promise<RewardRequestLog[]> {
    const query: any = {};

    if (startedAt || endedAt) {
      query.createdAt = {};
      if (startedAt) {
        query.createdAt.$gte = startedAt;
      }
      if (endedAt) {
        query.createdAt.$lte = endedAt;
      }
    }

    return this.rewordLogModel.find(query).exec();
  }

  async findByUserId(userId: string): Promise<RewardRequestLog[]> {
    return this.rewordLogModel
      .find({ userId: toObjectId(userId) })
      .lean()
      .exec();
  }
}
