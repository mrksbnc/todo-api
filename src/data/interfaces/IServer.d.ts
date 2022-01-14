'use strict';

import { Application } from 'express';

export interface IServer {
  readonly port: number;
  readonly app: Application;

  initializeRoutes: () => void;
  initializeMiddlewares: () => void;
  getServer: () => Application;
  listen: () => void;
}
