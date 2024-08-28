import { Express } from 'express';
import listEndpoints from 'express-list-endpoints';
import { Logger } from './log4';

export const printRoutes = (app: Express) => {
  const routesInfo = listEndpoints(app);

  for (const route of routesInfo) {
    Logger.info(`${route.methods}: ${route.path}`);

    const middlewares: string[] = [];
    for (const middleware of route.middlewares) {
      if (middleware !== 'middleware') middlewares.push(middleware);
    }

    if (middlewares.length) Logger.warn(`Middlewares: ${middlewares}\n`);
  }
};
