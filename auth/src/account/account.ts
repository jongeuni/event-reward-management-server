import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountRole } from './account-role';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  // 중복 안됨 ~~!!
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, defaultOptions: 'USER' })
  role: AccountRole;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
