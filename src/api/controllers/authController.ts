'use strict';

import { NextFunction, Request, Response } from 'express';
import ApiErrorMessageEnum from '../../data/enums/apiErrorMessages';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCode';
import HttpException from '../../data/exceptions/HttpException';
import { IController, IControllerConstructor } from '../../data/interfaces/controller';
class AuthController implements IController {
  readonly service;

  constructor({ service }: IControllerConstructor) {
    this.service = service;
  }

  public register = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      //
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
