'use strict';

import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/appConfig';
import appConfig from './config/appConfig';
import express, { Application } from 'express';
import { IRoute } from './interfaces/routeInterfaces';

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
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  public initialize() {
    this.app.listen(this.port, () => {
      console.log('server running..');
    });
  }
}

export default App;
