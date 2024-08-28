import { SessionOptions } from 'express-session';
import { MONGO_DB_CONNECTION_STRING, IS_PRODUCTION, SESSION_SECRET } from './env';

export const sessionConfig: SessionOptions = {
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    sameSite: IS_PRODUCTION ? 'none' : 'lax',
    secure: IS_PRODUCTION,
    domain: IS_PRODUCTION ? 'salonde.co.jp' : 'localhost123',
    // expires: new Date(getNextMonth(getCurrentTime().format()).format()),
    maxAge: 30 * 60 * 60 * 1000,
  },
};
