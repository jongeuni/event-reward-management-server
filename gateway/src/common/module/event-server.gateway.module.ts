import { Module } from '@nestjs/common';
import { UserGatewayController } from '../../user/user.gateway.controller';

@Module({
  imports: [],
  controllers: [UserGatewayController],
})
export class EventServerGatewayModule {}