import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardRequestLog, RewardRequestLogSchema } from '../schema/reward-log';
import { RewardLogRepository } from './reward-log.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardRequestLog.name, schema: RewardRequestLogSchema },
    ]),
  ],
  providers: [RewardLogRepository],
  exports: [RewardLogRepository],
})
export class RewardLogRepositoryModule {}