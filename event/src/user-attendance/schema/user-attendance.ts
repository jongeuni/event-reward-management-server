import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type UserAttendanceDocument = HydratedDocument<UserAttendance>;

@Schema({ timestamps: true })
export class UserAttendance {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  userId: ObjectId;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  month: number;

  @Prop({ type: [Date] })
  dates: Date[];
}

export const UserAttendanceSchema =
  SchemaFactory.createForClass(UserAttendance);
