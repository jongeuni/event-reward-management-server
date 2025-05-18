import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewordLog, RewordLogDocument } from './reword-log';

@Injectable()
export class RewordLogRepository {
  constructor(
    @InjectModel(RewordLog.name)
    readonly rewordLogModel: Model<RewordLogDocument>,
  ) {}
}
