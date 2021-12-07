'use strict';

import UserService from '../../services/userService';
import { generateInternalError } from '../../utils/error';
import { body, validationResult } from 'express-validator';
import { ICreateUserData } from '../../data/types/repository';
import BaseJsonResponse from '../../data/models/baseJsonResponse';
import { NextFunction, Request, Response, Router } from 'express';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';
import GeneralException from '../../data/errors/generalException';
import HttpException from '../../data/errors/httpException';
import ApiErrorMessageEnum from '../../data/constants/apiErrorMessageEnum';

class UserController {
  public readonly router: Router;
  private readonly path = '/user';
  protected readonly service: UserService;

  constructor(service: UserService) {
    this.service = service;
    this.router = Router();
    this.initializeRoutes();
  }

  public register = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        next(
          new GeneralException({
            message: 'invalid create user args recived from client',
            error: errors.array(),
            httpException: new HttpException({
              message: ApiErrorMessageEnum.BAD_REQUEST + ' invalid object recived',
              status: HttpStatusCodeEnum.BAD_REQUEST,
            }),
          }),
        );
        return;
      }

      const createUserArgs: ICreateUserData = request.body;
      await this.service.create(createUserArgs);

      response.status(HttpStatusCodeEnum.OK).json(new BaseJsonResponse({ message: 'CREATED', success: true }));
    } catch (error) {
      next(generateInternalError(error));
    }
  };

  private initializeRoutes() {
    this.router.post(
      this.path + '/' + 'create',
      body('email').isEmail().isLength({ max: 32 }),
      body('firstName').isLength({ max: 32 }),
      body('lastName').isLength({ max: 32 }),
      body('password').isLength({ min: 8 }),
      this.register,
    );
  }
}

export default UserController;
