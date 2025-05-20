import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAttendanceModule } from './user-attendance/user-attendance.module';
import { EventModule } from './event/event.module';
import { WalletModule } from './user-wallet/wallet.module';
import { RewardModule } from './reward/reward.module';
import { ItemModule } from './item/item.module';
import { InventoryModule } from './inventory/inventory.module';
import { DB_URL } from './common/constants/constants';

@Module({
  imports: [
    MongooseModule.forRoot(DB_URL),
    // MongooseModule.forRoot('mongodb://localhost:27017/event-db'),
    UserAttendanceModule,
    EventModule,
    WalletModule,
    RewardModule,
    ItemModule,
    InventoryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
