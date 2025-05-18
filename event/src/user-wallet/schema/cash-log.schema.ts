// cash-log.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CashLogType, CashSourceType } from './cash-log.type';
import { HydratedDocument, Types } from 'mongoose';

export type CashLogDocument = HydratedDocument<CashLog>;

@Schema({ timestamps: true })
export class CashLog {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: CashLogType })
  type: CashLogType;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'user' })
  source: CashSourceType;

  @Prop()
  description?: string; // '관리자 지급 시 description'

  @Prop()
  afterBalance: number; // 로그 후의 잔액
}

export const CashLogSchema = SchemaFactory.createForClass(CashLog);
