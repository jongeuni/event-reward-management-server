import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardLog, RewordLogDocument } from '../schema/reward-log';

@Injectable()
export class RewordLogRepository {
  constructor(
    @InjectModel(RewardLog.name)
    readonly rewordLogModel: Model<RewordLogDocument>,
  ) {}
}
