import { Inject, Injectable, Scope } from '@nestjs/common';

import { Account, AccountDocument } from '../account';
import { Model } from 'mongoose';
import { AccountCreateDto } from '../dto/account-create.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable({scope: Scope.REQUEST})
export class AccountRepository{
  constructor(
    @InjectModel(Account.name) readonly accountModel: Model<AccountDocument>
  ) {
  }

  async create(createUserDto: AccountCreateDto): Promise<Account> {
    return await this.accountModel.create(createUserDto);
  }

  async findByEmail(email: string): Promise<Account | null> {
    return this.accountModel.findOne({email}).lean().exec();
  }


}
