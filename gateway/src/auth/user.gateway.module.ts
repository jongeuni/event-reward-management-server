import { Module } from '@nestjs/common';
import { UserGatewayController } from './controller/user.gateway.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UserGatewayController],
})
export class UserGatewayModule {}
