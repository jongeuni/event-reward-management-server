import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account';
import { AccountController } from './controller/account.controller';
import { AccountService } from './service/account.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
