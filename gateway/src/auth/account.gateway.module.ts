import { Module } from '@nestjs/common';
import { AccountGatewayController } from './controller/account.gateway.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AccountGatewayController],
})
export class AccountGatewayModule {}
