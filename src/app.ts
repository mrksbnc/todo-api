'use strict';

import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import Config from './config';
import express, { Application } from 'express';
import { IRoute } from './interfaces/routeInterface';

class App {
  public readonly env: string;
  private readonly port: number;
  public readonly app: Application;

  constructor(routes: Readonly<IRoute[]>) {
    this.app = express();
    this.port = Config.get().port;
    this.env = Config.get().nodeEnv;

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
