import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserGatewayModule } from './auth/user.gateway.module';

@Module({
  imports: [UserGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
