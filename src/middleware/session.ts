import { SessionOptions } from 'express-session';
import { MONGO_DB_CONNECTION_STRING, IS_PRODUCTION, SESSION_SECRET } from './env';
import MongoStore from 'connect-mongo';

export const sessionConfig: SessionOptions = {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: IS_PRODUCTION ? 'none' : 'lax',
        secure: IS_PRODUCTION,
        domain: IS_PRODUCTION ? 'bizmunch.com' : 'api.bizmunch.com',
        // domain: IS_PRODUCTION ? 'bizmunch.com' : 'localhost',
        maxAge: 30 * 60 * 60 * 1000, // 30 days
    },
    store: MongoStore.create({
        mongoUrl: MONGO_DB_CONNECTION_STRING,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60, // 14 days expiration for the session
        autoRemove: 'native' // Automatically remove expired sessions
    })
};
