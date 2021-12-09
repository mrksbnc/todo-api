'use strict';

import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import logger from './utils/logger';
import cookieParser from 'cookie-parser';
import controllers from './api/controllers';
import express, { Application } from 'express';
import errorHandlerMiddleware from './api/middlewares/errorHandlerMiddleware';
import headerHandlerMiddleware from './api/middlewares/headerHandlerMiddleware';
import httpLogHandlerMiddleware from './api/middlewares/httpLogHandlerMiddleware';
import authenticationMiddleware from './api/middlewares/authenticationMiddleware';
import notFoundHandlerMiddleware from './api/middlewares/notFoundHandlerMiddleware';
import contentTypeValidatorMiddleware from './api/middlewares/contentTypeValidatorMiddleware';
import requestMethodValidatorMiddleware from './api/middlewares/requestMethodValidatorMiddleware';

class Server {
  private readonly port: number;
  private readonly app: Application;

  constructor() {
    this.app = express();
    this.port = config.server.port;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
    this.app.use(notFoundHandlerMiddleware);
    this.app.use(errorHandlerMiddleware);
  }

  private initializeMiddlewares(): void {
    this.app.all('*', headerHandlerMiddleware);
    this.app.use(helmet({ hidePoweredBy: true }));
    this.app.use(cors());
    this.app.use(hpp());

    this.app.use(requestMethodValidatorMiddleware);
    this.app.use(httpLogHandlerMiddleware);

    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json({ type: 'application/json' }));
    this.app.use(authenticationMiddleware);
  }

  public getServer() {
    return this.app;
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`${config.app_name} started on http://localhost:${this.port} in ${config.node_env} mode`);
    });
  }
}

export default Server;
