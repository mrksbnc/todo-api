'use strict';

import cache from '../../utils/cache';
import PartialUser from '../../types/partialUser';
import UserService from '../../services/userService';
import AuthService from '../../services/authService';
import { CreateUserData } from '../../types/createModels';
import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response, Router } from 'express';
import InvalidArgumentError from '../../errors/invalidArgumentError';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';
import ResponseMessageEnum from '../../data/enums/responseMessageEnum';
import contentTypeValidatorMiddleware from '../middlewares/contentTypeValidatorMiddleware';

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

  private readonly register = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const createUserData: CreateUserData = request.body;
      const partialUser = await this.userService.create(createUserData);

      const key = '/user/get/' + partialUser.id;
      await cache.set<PartialUser>(key, partialUser);

      response.status(HttpStatusCodeEnum.OK).json({ message: ResponseMessageEnum.CREATED });
    } catch (error) {
      next(error);
    }
  };

  private readonly login = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const { email, password }: { email: string; password: string } = request.body;
      const { token, user } = await this.authService.login(email, password);

      response.status(HttpStatusCodeEnum.OK).json({ user, token: `Bearer ${token}` });
    } catch (error) {
      next(error);
    }
  };

  private initializeRoutes() {
    this.router.post(
      this.path + '/register',
      contentTypeValidatorMiddleware,
      body('email').exists().isEmail().isLength({ max: 32 }),
      body('firstName').exists().isLength({ max: 32 }),
      body('lastName').exists().isLength({ max: 32 }),
      body('password').exists().isLength({ min: 8 }),
      this.register,
    );
    this.router.post(
      this.path + '/login',
      contentTypeValidatorMiddleware,
      body('email').exists().isEmail().isLength({ max: 32 }),
      body('password').exists().isLength({ min: 8 }),
      this.login,
    );
  }
}

export default AuthController;
