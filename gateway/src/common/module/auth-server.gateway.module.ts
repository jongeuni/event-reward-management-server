import { Module } from '@nestjs/common';
import { UserGatewayController } from '../../user/user.gateway.controller';
import { AuthGatewayController } from '../../auth/auth.gateway.controller';
import { AdminGatewayController } from '../../user/admin.gateway.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [
    UserGatewayController,
    AuthGatewayController,
    AdminGatewayController,
  ],
})
export class AuthServerGatewayModule {}
