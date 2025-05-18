import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewordLog, RewordLogSchema } from './reword-log';
import { RewordLogRepository } from './reword-log.respository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewordLog.name, schema: RewordLogSchema },
    ]),
  ],
  providers: [RewordLogRepository],
  exports: [RewordLogRepository],
})
export class RewordLogRepositoryModule {}