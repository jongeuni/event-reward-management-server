import { Module } from '@nestjs/common';
import { UserGatewayController } from '../../user/user.gateway.controller';
import { RewardGatewayController } from '../../reward/reward.gateway.controller';
import { WalletGatewayController } from '../../wallet/wallet.gateway.controller';
import { ItemGatewayController } from '../../item/item.gateway.controller';

@Module({
  imports: [],
  controllers: [
    UserGatewayController,
    WalletGatewayController,
    RewardGatewayController,
    ItemGatewayController,
  ],
})
export class EventServerGatewayModule {}