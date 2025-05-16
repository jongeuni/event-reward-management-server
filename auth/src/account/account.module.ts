import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account';
import { AccountController } from './controller/account.controller';
import { AccountService } from './service/account.service';
import { AccountRepositoryModule } from './repository/account.repository.module';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    AccountRepositoryModule
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
