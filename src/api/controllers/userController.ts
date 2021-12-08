'use strict';

import UserService from '../../services/userService';
import { generateInternalError } from '../../utils/error';
import { NextFunction, Request, Response, Router } from 'express';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';
import BaseJsonResponse from '../../data/models/baseJsonResponse';
import IPartialUser from '../../data/types/partialUser';

class UserController {
  public readonly router: Router;
  private readonly path = '/user';
  protected readonly service: UserService;

  constructor(service: UserService) {
    this.service = service;
    this.router = Router();
    this.initializeRoutes();
  }

  getById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(request.params.id);
      const user = await this.service.getPartialUserById(id);

      response
        .status(HttpStatusCodeEnum.OK)
        .json(new BaseJsonResponse<IPartialUser>({ success: true, message: '', data: user }));
    } catch (error) {
      next(generateInternalError(error));
    }
  };

  private initializeRoutes() {
    //
  }
}

export default UserController;
