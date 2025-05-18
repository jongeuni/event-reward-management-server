// event/schemas/event-reward.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventRewardType } from './event.type';
import { EventRewardDto } from '../dto/event-create.dto';
import { Types } from 'mongoose';
import { toObjectId } from '../../common/util/object-id';

@Schema({ _id: false })
export class EventReward {
  @Prop({ required: true, enum: EventRewardType })
  type: EventRewardType;

  // 공통 속성
  // @Prop()
  // amount?: number;

  // 타입별 속성
  @Prop()
  itemId?: Types.ObjectId;

  @Prop()
  cash?: string;

  @Prop()
  titleId?: Types.ObjectId; // 칭호

  constructor(dto: EventRewardDto) {
    this.type = dto.type;
    this.itemId = dto.itemId == undefined ? undefined : toObjectId(dto.itemId);
    this.cash = dto.cash;
    this.titleId =
      dto.titleId == undefined ? undefined : toObjectId(dto.titleId);
  }
}

export const EventRewardSchema = SchemaFactory.createForClass(EventReward);
