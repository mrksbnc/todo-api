'use strict';

import { Router } from 'express';
import { IApiRoute } from '../../data/interfaces/route';

class AuthRoute implements IApiRoute {
  public path = '/auth';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //
  }
}

export default AuthRoute;
