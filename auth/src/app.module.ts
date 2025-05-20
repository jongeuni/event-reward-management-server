import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DB_URL } from './common/constants/constants';

@Module({
  imports: [
    MongooseModule.forRoot(DB_URL),
    // MongooseModule.forRoot('mongodb://localhost:27017/auth-db'),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
