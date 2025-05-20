import { Module } from '@nestjs/common';
import { AuthServerGatewayModule } from './common/module/auth-server.gateway.module';
import { EventServerGatewayModule } from './common/module/event-server.gateway.module';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [AuthServerGatewayModule, EventServerGatewayModule, AuthModule],
})
export class AppModule {}
