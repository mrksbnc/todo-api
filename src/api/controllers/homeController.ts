'use strict';

import UserService from '../../services/userService';
import { param, validationResult } from 'express-validator';
import { NextFunction, Request, Response, Router } from 'express';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';
import InvalidArgumentError from '../../data/errors/invalidArgumentError';

class HomeController {
  public readonly router: Router;
  private readonly path = '/home';
  protected readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    this.router = Router();
    this.initializeRoutes();
  }

  private readonly getAppData = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const id = Number(request.params.id);
      const pu = await this.userService.getPartialUserById(id);

      response.status(HttpStatusCodeEnum.OK).json({ user: pu, success: true });
    } catch (error) {
      next(error);
    }
  };

  private initializeRoutes() {
    this.router.get(this.path + '/get/data/:id', param('id').exists().toInt().isNumeric(), this.getAppData);
  }
}

export default HomeController;
