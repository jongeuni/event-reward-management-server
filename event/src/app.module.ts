import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAttendanceModule } from './user/user-attendance.module';
import { EventModule } from './event/event.module';
import { WalletModule } from './user-wallet/wallet.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/event-db'),
    UserAttendanceModule,
    EventModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
