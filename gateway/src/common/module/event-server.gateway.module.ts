import { Module } from '@nestjs/common';
import { UserGatewayController } from '../../user/user.gateway.controller';
import { RewardGatewayController } from '../../reward/reward.gateway.controller';
import { WalletGatewayController } from '../../wallet/wallet.gateway.controller';
import { ItemGatewayController } from '../../item/item.gateway.controller';
import { EventGatewayController } from '../../event/event.gateway.controller';
import { HttpModule } from '@nestjs/axios';
import { AttendanceGatewayController } from '../../attendance/attendance.gateway.controller';
import { InventoryGatewayController } from '../../inventory/inventory.gateway.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    UserGatewayController,
    WalletGatewayController,
    RewardGatewayController,
    ItemGatewayController,
    EventGatewayController,
    AttendanceGatewayController,
    InventoryGatewayController,
  ],
})
export class EventServerGatewayModule {}