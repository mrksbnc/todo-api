'use strict';

import express, { Application } from 'express';
import config from './config';
import logger from './utils/logger';

class Server {
  private readonly port: number;
  private readonly app: Application;

  constructor() {
    this.app = express();
    this.port = config.server.port;
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
