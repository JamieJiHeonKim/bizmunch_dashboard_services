import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectMongo } from './mongo';
import { Logger } from './log4';
import { COOKIE_SECRET, IS_PRODUCTION } from './env';
import { swaeger } from './Swagger.config';
import I18NLCAOLE from '../locales/I18-locale';
import { sessionConfig } from './session';

const expressSession = require('express-session');


export const config = async (app: express.Application) => {

  app.use(Logger.access());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(COOKIE_SECRET));
  app.use(express.static(path.join(__dirname, '../../public')));
  I18NLCAOLE(app);


 app.use(expressSession(sessionConfig));

  swaeger(app);

  await connectMongo();
  if (IS_PRODUCTION) app.set('trust proxy', 1);
};
