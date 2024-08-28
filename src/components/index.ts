import express from 'express';
import rateLimit from 'express-rate-limit';
import authRouter from "./user/index";

import components from './components';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const registerComponents = (app: express.Application) => {
  if (process.env.NODE_ENV === 'development') app.use('/v1', components);
  else app.use('/v1',apiLimiter, components);

  
  app.get('/', (req, res, next) => {
    return res.status(200).json('Hello World');
  });
};
