'use strict';

import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import logger from './utils/logger';
import config from './config/baseConfig';
import cookieParser from 'cookie-parser';
import controllers from './api/controllers';
import express, { Application } from 'express';
import httpLogHandlerMiddleware from './api/middlewares/httpLogMiddleware';
import errorHandlerMiddleware from './api/middlewares/errorHandlerMiddleware';
import headerHandlerMiddleware from './api/middlewares/headerHandlerMiddleware';
import authenticationMiddleware from './api/middlewares/authenticationMiddleware';
import notFoundHandlerMiddleware from './api/middlewares/notFoundHandlerMiddleware';
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
    this.app.use(authenticationMiddleware);
    this.app.all('*', headerHandlerMiddleware);
    this.app.use(helmet({ hidePoweredBy: true }));
    this.app.use(cors());
    this.app.use(hpp());

    this.app.use(requestMethodValidatorMiddleware);
    this.app.use(httpLogHandlerMiddleware);
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json({ type: 'application/json' }));
  }

  public getServer() {
    return this.app;
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`${config.app_name} started on ${config.server.base_url}:${this.port} in ${config.node_env} mode!`);
    });
  }
}

export default Server;
