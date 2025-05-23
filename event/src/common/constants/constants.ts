import * as dotenv from 'dotenv';

dotenv.config();

export const DB_URL =
  process.env.DB_URL ?? 'mongodb://localhost:27017/event-db';