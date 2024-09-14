import { SessionOptions } from 'express-session';
import { MONGO_DB_CONNECTION_STRING, IS_PRODUCTION, SESSION_SECRET } from './env';
import MongoStore from 'connect-mongo';

export const mongoUri = `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;

if (!mongoUri) {
  throw new Error("MONGO_DB_CONNECTION_STRING is not defined in the environment variables.");
}

export const sessionConfig: SessionOptions = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      sameSite: IS_PRODUCTION ? 'none' : 'lax',
      secure: IS_PRODUCTION,
      domain: '.bizmunch.com',
      // domain: 'localhost',
      maxAge: 30 * 60 * 60 * 1000, // 30 days
  },
  store: MongoStore.create({
      mongoUrl: mongoUri,
      collectionName: 'sessions',
      ttl: 14 * 24 * 60 * 60, // 14 days expiration for the session
      autoRemove: 'native', // Automatically remove expired sessions
  }),
};