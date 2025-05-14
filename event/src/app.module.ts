import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb:27017/event-db')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
