'use strict';

import UserService from '../../services/userService';
import { NextFunction, Request, Response } from 'express';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCode';
import { ICreateUserArgs } from '../../data/interfaces/repository';
import { IController, IControllerConstructor } from '../../data/interfaces/controller';

class AuthController implements IController<UserService> {
  readonly service;

  constructor({ service }: IControllerConstructor<UserService>) {
    this.service = service;
  }

  public register = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const args = request.body as ICreateUserArgs;
      await this.service.create(args);

      response.status(HttpStatusCodeEnum.CREATED).json({ message: 'CREATED' });
    } catch (error) {
      next(error);
    }
  };

  public login = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      //
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
