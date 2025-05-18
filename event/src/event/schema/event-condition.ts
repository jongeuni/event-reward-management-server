// event/schemas/event-condition.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventConditionType } from './event.type';
import { EventConditionDto } from '../dto/event-create.dto';
import { toObjectId } from '../../common/util/object-id';
import { Types } from 'mongoose';

@Schema({ _id: false })
export class EventCondition {
  @Prop({ required: true, enum: EventConditionType })
  type: EventConditionType;

  // optional: 조건별 필요한 필드 정의
  @Prop()
  days?: number;

  @Prop()
  cash?: number;

  @Prop()
  itemId?: Types.ObjectId;

  @Prop()
  count?: number;

  constructor(dto: EventConditionDto) {
    this.type = dto.type;
    this.days = dto.days;
    this.cash = dto.cash;
    this.itemId = dto.itemId == undefined ? undefined : toObjectId(dto.itemId);
    this.count = dto.count;
  }
}

export const EventConditionSchema = SchemaFactory.createForClass(EventCondition);
