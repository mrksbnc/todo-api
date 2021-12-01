'use strict';

import { Router } from 'express';
import AuthController from '../controllers/authController';
import { IApiRoute, IApiRouteConstructor } from '../../data/interfaces/route';

class AuthRoute implements IApiRoute<AuthController> {
  public controller;
  public path = '/auth';
  public router = Router();

  constructor({ controller }: IApiRouteConstructor<AuthController>) {
    this.controller = controller;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/register', this.controller.register);
  }
}

export default AuthRoute;
