import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountGatewayModule } from './auth/account.gateway.module';

@Module({
  imports: [AccountGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
