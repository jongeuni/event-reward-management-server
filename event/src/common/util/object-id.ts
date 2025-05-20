import { Types } from 'mongoose';

export type ObjectIdType = string | Types.ObjectId;

export function toObjectId(id: ObjectIdType) {
  return typeof id === 'string' ? new Types.ObjectId(id) : id;
}
