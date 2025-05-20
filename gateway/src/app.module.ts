import { Module } from '@nestjs/common';
import { AuthServerGatewayModule } from './common/module/auth-server.gateway.module';
import { EventServerGatewayModule } from './common/module/event-server.gateway.module';
import { AuthModule } from './common/auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [AuthServerGatewayModule, EventServerGatewayModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
