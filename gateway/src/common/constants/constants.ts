import * as dotenv from 'dotenv';

dotenv.config();

export const AUTH_SERVER = process.env.AUTH_SERVER_URL!;
export const EVENT_SERVER = process.env.EVENT_SERVER_URL!;
export const SECRET_KEY = process.env.SECRET_KEY!;