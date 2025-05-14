import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/auth-db'),
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
