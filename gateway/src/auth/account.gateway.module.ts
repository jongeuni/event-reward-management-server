import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountGatewayController } from './controller/account.gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'ACCOUNT_SERVICE', transport: Transport.TCP },
      { name: 'PRODUCT_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [AccountGatewayController],
})
export class AccountGatewayModule {}
