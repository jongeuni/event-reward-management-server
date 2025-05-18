import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardLog, RewordLogSchema } from '../schema/reward-log';
import { RewordLogRepository } from './reward-log.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardLog.name, schema: RewordLogSchema },
    ]),
  ],
  providers: [RewordLogRepository],
  exports: [RewordLogRepository],
})
export class RewordLogRepositoryModule {}