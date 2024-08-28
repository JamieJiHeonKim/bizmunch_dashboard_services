"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LINE_CONNECT_SUCCESS_URL = exports.LINE_CALLBACK_URL = exports.LINE_SECRET_LOGIN = exports.LINE_CHANNEL_ID_LOGIN = exports.LINE_SECRET = exports.LINE_CHANNEL_ID = exports.LINE_KID = exports.SENDGRID_EMAIL_SENDER = exports.FRONT_USER_URL = exports.SEND_GRID_API_KEY = exports.COOKIE_SECRET = exports.REFRESH_TOKEN_SECRET = exports.STRIPE_SECRET_KEY = exports.MONGO_DB_CONNECTION_STRING = exports.JWT_SECRET = exports.SESSION_SECRET = exports.LOGIN_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.IS_PRODUCTION = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const log4_1 = require("./log4");
log4_1.Logger.initialize();
if (fs_1.default.existsSync('.env')) {
    dotenv_1.default.config({ path: '.env' });
}
const ENVIRONMENT = process.env.NODE_ENV;
exports.IS_PRODUCTION = ENVIRONMENT === 'production';
if (!process.env.SESSION_SECRET) {
    log4_1.Logger.warn('SESSION_SECRET IS UNDEFINED AT ENV FILE');
    process.exit(1);
}
if (!process.env.JWT_SECRET) {
    log4_1.Logger.warn('JWT_SECRET IS UNDEFINED AT ENV FILE');
    process.exit(1);
}
const SESSION_SECRET = process.env.SESSION_SECRET;
exports.SESSION_SECRET = SESSION_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
exports.REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;
const MONGO_DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING;
exports.MONGO_DB_CONNECTION_STRING = MONGO_DB_CONNECTION_STRING;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
exports.STRIPE_SECRET_KEY = STRIPE_SECRET_KEY;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
exports.COOKIE_SECRET = COOKIE_SECRET;
const SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY;
exports.SEND_GRID_API_KEY = SEND_GRID_API_KEY;
const FRONT_USER_URL = exports.IS_PRODUCTION ? process.env.FRONT_USER_URL : process.env.FRONT_USER_URL_DEV;
exports.FRONT_USER_URL = FRONT_USER_URL;
const SENDGRID_EMAIL_SENDER = process.env.SENDGRID_EMAIL_SENDER;
exports.SENDGRID_EMAIL_SENDER = SENDGRID_EMAIL_SENDER;
// LINE Messaging API
const LINE_KID = process.env.LINE_KID;
exports.LINE_KID = LINE_KID;
const LINE_SECRET = process.env.LINE_SECRET;
exports.LINE_SECRET = LINE_SECRET;
const LINE_CHANNEL_ID = process.env.LINE_CHANNEL_ID;
exports.LINE_CHANNEL_ID = LINE_CHANNEL_ID;
// LINE Login API
const LINE_CHANNEL_ID_LOGIN = process.env.LINE_CHANNEL_ID_LOGIN;
exports.LINE_CHANNEL_ID_LOGIN = LINE_CHANNEL_ID_LOGIN;
const LINE_SECRET_LOGIN = process.env.LINE_SECRET_LOGIN;
exports.LINE_SECRET_LOGIN = LINE_SECRET_LOGIN;
const LINE_CALLBACK_URL = process.env.LINE_CALLBACK_URL;
exports.LINE_CALLBACK_URL = LINE_CALLBACK_URL;
const LINE_CONNECT_SUCCESS_URL = process.env.LINE_CONNECT_SUCCESS_URL;
exports.LINE_CONNECT_SUCCESS_URL = LINE_CONNECT_SUCCESS_URL;
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.LOGIN_TOKEN_SECRET = process.env.LOGIN_TOKEN_SECRET;
//# sourceMappingURL=env.js.map