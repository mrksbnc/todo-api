'use strict';

import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import logger from './utils/logger';
import config from './config/config';
import appConfig from './config/config';
import express, { Application } from 'express';
import { IApiRoute } from './data/interfaces/routeInterfaces';
import { IAppConstructor } from './data/interfaces/appInterfaces';
import notFoundMiddleware from './api/middlewares/notFoundMiddleware';
import errorHandlingMiddleware from './api/middlewares/errorMiddleware';
import httpTrafficLogMiddleware from './api/middlewares/httpTrafficLogMiddleware';

class App {
  public readonly env: string;
  private readonly port: number;
  public readonly app: Application;

  constructor({ routes }: IAppConstructor) {
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
    this.app.use(httpTrafficLogMiddleware);
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Readonly<IApiRoute[]>) {
    routes.forEach((route: IApiRoute) => {
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
