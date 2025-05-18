// cash-log.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CashLogType, CashSourceType } from './cash-log.type';

@Schema({ timestamps: true })
export class CashLog {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: ['CHARGE', 'USE', 'BONUS'] })
  type: CashLogType;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'user' })
  source: CashSourceType;

  @Prop()
  description?: string; // '관리자 지급 시 description'

  @Prop()
  balanceAfter: number; // 로그 후의 잔액
}

export const CashLogSchema = SchemaFactory.createForClass(CashLog);
