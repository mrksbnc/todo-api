'use strict';

import UserService from '../../services/userService';
import PartialUser from '../../data/types/partialUser';
import { generateInternalError } from '../../data/errors';
import BaseResponse from '../../data/models/baseResponse';
import { NextFunction, Request, Response, Router } from 'express';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';

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

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse<PartialUser>({ data: user }));
    } catch (error) {
      next(generateInternalError(error));
    }
  };

  private initializeRoutes() {
    //
  }
}

export default UserController;
