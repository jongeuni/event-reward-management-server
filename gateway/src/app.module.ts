import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthServerGatewayModule } from './common/module/auth-server.gateway.module';
import { HttpModule } from '@nestjs/axios';
import { EventServerGatewayModule } from './common/module/event-server.gateway.module';

@Module({
  imports: [HttpModule, AuthServerGatewayModule, EventServerGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
