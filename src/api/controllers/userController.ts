'use strict';

import UserService from '../../services/userService';
import PartialUser from '../../data/types/partialUser';
import BaseResponse from '../../data/models/baseResponse';
import { IUpdateUserData } from '../../data/types/repository';
import { body, param, validationResult } from 'express-validator';
import { NextFunction, Request, Response, Router } from 'express';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';
import InvalidArgumentError from '../../data/errors/invalidArgumentError';
import ResponseMessageEnum from '../../data/constants/responseMessageEnum';

class UserController {
  public readonly router: Router;
  private readonly path = '/user';
  protected readonly service: UserService;

  constructor(service: UserService) {
    this.service = service;
    this.router = Router();
    this.initializeRoutes();
  }

  private readonly getById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const id = Number(request.params.id);
      const user = await this.service.getPartialUserById(id);

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse<PartialUser>({ data: user }));
    } catch (error) {
      next(error);
    }
  };

  private readonly getByEmail = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const email = String(request.params.email);
      const user = await this.service.getPartialUserByEmail(email);

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse<PartialUser>({ data: user }));
    } catch (error) {
      next(error);
    }
  };

  private readonly update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const { id, data }: { id: number; data: IUpdateUserData } = request.body;
      await this.service.update(id, data);

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse({ message: ResponseMessageEnum.UPDATED }));
    } catch (error) {
      next(error);
    }
  };

  private readonly delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const id = Number(request.params.id);
      await this.service.delete(id);

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse({ message: ResponseMessageEnum.DELETED }));
    } catch (error) {
      next(error);
    }
  };

  private initializeRoutes() {
    this.router.get(this.path + '/' + 'get/:id', param('id').exists().isInt(), this.getById);
    this.router.get(this.path + '/' + 'get/email/:email', param('email').exists().isEmail(), this.getByEmail);
    this.router.put(this.path + '/' + 'update', body('id').exists().isInt(), body('data').exists(), this.update);
    this.router.delete(this.path + '/' + 'delete/:id', param('id').exists().isInt(), this.delete);
  }
}

export default UserController;
