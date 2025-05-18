import { Module } from '@nestjs/common';
import { RewordController } from './reword.controller';
import { RewordService } from './reword.service';

@Module({
  controllers: [RewordController],
  providers: [RewordService],
})
export class RewordModule {}
