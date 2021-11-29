'use strict';

import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import logger from './utils/logger';
import config from './config/appConfig';
import appConfig from './config/appConfig';
import express, { Application } from 'express';
import { IRoute } from './interfaces/routeInterfaces';
import notFoundMiddleware from './api/middlewares/notFoundMiddleware';
import errorHandlingMiddleware from './api/middlewares/errorMiddleware';

class App {
  public readonly env: string;
  private readonly port: number;
  public readonly app: Application;

  constructor({ routes }: { routes: Readonly<IRoute[]> }) {
    this.app = express();
    this.env = config.app.env;
    this.port = appConfig.server.port;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(hpp());
    this.app.use(helmet({ hidePoweredBy: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Readonly<IRoute[]>) {
    routes.forEach((route: IRoute) => {
      this.app.use('/', route.router);
    });
    this.app.use(notFoundMiddleware);
  }

  private initializeErrorHandling() {
    this.app.use(errorHandlingMiddleware);
  }

  public initialize() {
    this.app.listen(this.port, () => {
      logger.info(`server running on http://localhost:${this.port} in ${this.env} mode...`);
    });
  }
}

export default App;
