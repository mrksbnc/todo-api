'use strict';

import UserService from '../../services/userService';
import AuthService from '../../services/authService';
import PartialUser from '../../data/types/partialUser';
import BaseResponse from '../../data/models/baseResponse';
import { generateInternalError } from '../../data/errors';
import { body, validationResult } from 'express-validator';
import HttpException from '../../data/errors/httpException';
import { ICreateUserData } from '../../data/types/repository';
import GeneralException from '../../data/errors/generalException';
import { NextFunction, Request, Response, Router } from 'express';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';
import ApiErrorMessageEnum from '../../data/constants/apiErrorMessageEnum';

class AuthController {
  public readonly router: Router;
  private readonly path = '/auth';
  protected readonly userService: UserService;
  protected readonly authService: AuthService;

  constructor(userService: UserService, authservice: AuthService) {
    this.userService = userService;
    this.authService = authservice;
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
      await this.userService.create(createUserArgs);

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse({ message: 'CREATED', success: true }));
    } catch (error) {
      next(generateInternalError(error));
    }
  };

  public login = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password }: { email: string; password: string } = request.body;
      const { token, user } = await this.authService.login(email, password);

      response
        .status(HttpStatusCodeEnum.OK)
        .cookie('todo-api-token', token, {
          maxAge: 86400 * 1000,
          httpOnly: false,
          secure: false,
        })
        .json(new BaseResponse<PartialUser>({ data: user }));
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
    this.router.post(
      this.path + '/' + 'login',
      body('email').isEmail().isLength({ max: 32 }),
      body('password').isLength({ min: 8 }),
      this.login,
    );
  }
}

export default AuthController;
