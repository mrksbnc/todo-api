'use strict';

import { Router } from 'express';
import UserService from '../../services/userService';

class UserController {
  public readonly router: Router;
  private readonly path = '/user';
  protected readonly service: UserService;

  constructor(service: UserService) {
    this.service = service;
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //
  }
}

export default UserController;
