import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class UserAttendance {
  @Prop({ required: true })
  userId: ObjectId;

  @Prop({ type: [Date] })
  dates: Date[];
}

export type UserAttendanceDocument = HydratedDocument<UserAttendance>;
export const UserAttendanceSchema = SchemaFactory.createForClass(UserAttendance);
