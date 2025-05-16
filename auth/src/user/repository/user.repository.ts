import { Inject, Injectable, Scope } from '@nestjs/common';

import { User, UserDocument } from '../user';
import { Model } from 'mongoose';
import { UserCreateDto } from '../dto/user-create.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable({scope: Scope.REQUEST})
export class UserRepository {
  constructor(
    @InjectModel(User.name) readonly accountModel: Model<UserDocument>
  ) {
  }

  async create(createUserDto: UserCreateDto): Promise<User> {
    return await this.accountModel.create(createUserDto);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.accountModel.findOne({email}).lean().exec();
  }


}
