import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAttendanceModule } from './user/user-attendance.module';
import { EventModule } from './event/event.module';
import { WalletModule } from './user-wallet/wallet.module';
import { RewardModule } from './reward/reward.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://mongodb:27017/event-db'),
    MongooseModule.forRoot('mongodb://localhost:27017/event-db'),
    UserAttendanceModule,
    EventModule,
    WalletModule,
    RewardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
