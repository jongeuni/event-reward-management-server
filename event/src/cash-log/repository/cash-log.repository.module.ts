import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CashLogRepository } from './cash-log.repository';
import { CashLog, CashLogSchema } from '../cash-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CashLog.name, schema: CashLogSchema }]),
  ],
  providers: [CashLogRepository],
  exports: [CashLogRepository],
})
export class CashLogRepositoryModule {}
