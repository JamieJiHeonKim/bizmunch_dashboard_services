import dotenv from 'dotenv';
import fs from 'fs';
import { Logger } from './log4';
Logger.initialize();

// if (fs.existsSync('.env')) {
//   dotenv.config({ path: '.env' });
// }

const ENVIRONMENT = process.env.NODE_ENV;
export const IS_PRODUCTION = ENVIRONMENT === 'production';
console.log('env.ts starting');
console.log('IS_PRODUCTION:', IS_PRODUCTION);

if (!process.env.SESSION_SECRET) {
  Logger.warn('SESSION_SECRET IS UNDEFINED AT ENV FILE');
  process.exit(1);
}





if (!process.env.JWT_SECRET) {
  Logger.warn('JWT_SECRET IS UNDEFINED AT ENV FILE');
  process.exit(1);
}




const SESSION_SECRET = process.env.SESSION_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const MONGO_DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING;

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;

const COOKIE_SECRET = process.env.COOKIE_SECRET as string;

const SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY as string;

const FRONT_USER_URL = IS_PRODUCTION? process.env.FRONT_USER_URL as string : process.env.FRONT_USER_URL_DEV as string;

const SENDGRID_EMAIL_SENDER = process.env.SENDGRID_EMAIL_SENDER as string;

// LINE Messaging API
const LINE_KID = process.env.LINE_KID as string;
const LINE_SECRET = process.env.LINE_SECRET as string;
const LINE_CHANNEL_ID = process.env.LINE_CHANNEL_ID as string;
// LINE Login API
const LINE_CHANNEL_ID_LOGIN = process.env.LINE_CHANNEL_ID_LOGIN as string;
const LINE_SECRET_LOGIN = process.env.LINE_SECRET_LOGIN as string;
const LINE_CALLBACK_URL = process.env.LINE_CALLBACK_URL as string;
const LINE_CONNECT_SUCCESS_URL = process.env.LINE_CONNECT_SUCCESS_URL as string;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const LOGIN_TOKEN_SECRET = process.env.LOGIN_TOKEN_SECRET;


export {
  SESSION_SECRET,
  JWT_SECRET,
  MONGO_DB_CONNECTION_STRING,
  STRIPE_SECRET_KEY,
  REFRESH_TOKEN_SECRET,
  COOKIE_SECRET,
  SEND_GRID_API_KEY,
  FRONT_USER_URL,
  SENDGRID_EMAIL_SENDER,
  LINE_KID,
  LINE_CHANNEL_ID,
  LINE_SECRET,
  LINE_CHANNEL_ID_LOGIN,
  LINE_SECRET_LOGIN,
  LINE_CALLBACK_URL,
  LINE_CONNECT_SUCCESS_URL
};
