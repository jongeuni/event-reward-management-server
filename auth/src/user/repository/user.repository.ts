import { Injectable } from '@nestjs/common';

import { User, UserDocument } from '../schema/user';
import { Model } from 'mongoose';
import { UserCreateDto } from '../dto/user-create.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: UserCreateDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }
}
