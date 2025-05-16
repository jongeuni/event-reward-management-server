import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { AccountRole } from './account-role';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'USER' })
  role: AccountRole;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
