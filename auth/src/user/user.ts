import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { UserRole } from './user-role';

export type UserDocument = User & Document;

@Schema()
export class User {
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
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
