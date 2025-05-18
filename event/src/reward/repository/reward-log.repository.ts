import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardLog, RewardLogDocument } from '../schema/reward-log';
import { toObjectId } from '../../common/util/object-id';
import { EventRewardType } from '../../event/schema/event.type';

@Injectable()
export class RewardLogRepository {
  constructor(
    @InjectModel(RewardLog.name)
    readonly rewordLogModel: Model<RewardLogDocument>,
  ) {}

  async createLog(
    eventId: string,
    userId: string,
    rewardType: EventRewardType | null,
    isSuccess: boolean,
  ) {
    await this.rewordLogModel.create({
      eventId: toObjectId(eventId),
      userId: toObjectId(userId),
      type: rewardType,
      isSuccess,
    });
  }
}
