'use strict';

import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import logger from './utils/logger';
import controllers from './api/controllers';
import express, { Application, NextFunction, Request, Response } from 'express';
import notFoundHandler from './api/middlewares/notFound';
import errorHandler from './api/middlewares/errorHandler';

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
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  private initializeMiddlewares(): void {
    this.app.use(hpp());
    this.app.use(cors());
    this.app.use(helmet({ hidePoweredBy: true }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json({ type: 'application/json' }));
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
