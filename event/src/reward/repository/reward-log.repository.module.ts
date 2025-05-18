import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardLog, RewordLogSchema } from '../schema/reward-log';
import { RewardLogRepository } from './reward-log.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardLog.name, schema: RewordLogSchema },
    ]),
  ],
  providers: [RewardLogRepository],
  exports: [RewardLogRepository],
})
export class RewardLogRepositoryModule {}