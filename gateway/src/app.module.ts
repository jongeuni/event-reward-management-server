import { Module } from '@nestjs/common';
import { AuthServerGatewayModule } from './common/module/auth-server.gateway.module';
import { EventServerGatewayModule } from './common/module/event-server.gateway.module';

@Module({
  imports: [AuthServerGatewayModule, EventServerGatewayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
