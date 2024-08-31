/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const whitelist = [
  'http://localhost:8081',
  'http://localhost:3001',
  'http://localhost:3000',
  'https://bizmunch.com',
  'https://api.bizmunch.com'
];

export const corsOptions = {
  origin(origin: any, callback: any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
