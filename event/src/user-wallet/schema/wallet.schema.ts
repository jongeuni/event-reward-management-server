import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserWalletDocument = HydratedDocument<UserWallet>;

@Schema({ timestamps: true })
export class UserWallet {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ default: 0 }) // 현재 사용 가능한 금액
  balance: number;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserWalletSchema = SchemaFactory.createForClass(UserWallet);
