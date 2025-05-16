import { AccountRepository } from './account.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '../account';

@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
  providers: [AccountRepository],
  exports: [AccountRepository]
})
export class AccountRepositoryModule {
}
