'use strict';

import cache from '../../utils/cache';
import PartialUser from '../../types/partialUser';
import UserService from '../../services/userService';
import { UpdateUserData } from '../../types/updateModels';
import { body, param, validationResult } from 'express-validator';
import { NextFunction, Request, Response, Router } from 'express';
import InvalidArgumentError from '../../errors/invalidArgumentError';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';
import ResponseMessageEnum from '../../data/enums/responseMessageEnum';
import contentTypeValidatorMiddleware from '../middlewares/contentTypeValidatorMiddleware';

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

      const key = request.path;
      const cachedValue = await cache.get<PartialUser>(key);
      const responseData: { user?: PartialUser } = { user: undefined };

      if (cachedValue) {
        responseData.user = cachedValue;
      } else {
        const id = Number(request.params.id);
        const partialUser = await this.service.getPartialUserById(id);

        await cache.set(key, partialUser);
        responseData.user = partialUser;
      }

      response.status(HttpStatusCodeEnum.OK).json(responseData);
    } catch (error) {
      next(error);
    }
  };

  private readonly update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const { id, data }: { id: number; data: UpdateUserData } = request.body;
      const partialUser = await this.service.update(id, data);
      const keyWithId = this.path + '/get/' + id;
      const keyWithEmail = this.path + '/get/email/' + partialUser.email;

      await cache.set<PartialUser>(keyWithId, partialUser);
      await cache.set<PartialUser>(keyWithEmail, partialUser);

      response.status(HttpStatusCodeEnum.OK).json({ message: ResponseMessageEnum.UPDATED });
    } catch (error) {
      next(error);
    }
  };

  private readonly delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const id = Number(request.params.id);
      const key = this.path + '/get/' + id;

      await this.service.delete(id);
      await cache.delete(key);

      response.status(HttpStatusCodeEnum.OK).json({ message: ResponseMessageEnum.DELETED });
    } catch (error) {
      next(error);
    }
  };

  private initializeRoutes() {
    this.router.get(this.path + '/get/:id', param('id').exists().toInt().isNumeric(), this.getById);
    this.router.put(
      this.path + '/update',
      contentTypeValidatorMiddleware,
      body('id').exists(),
      body('data').exists().isObject(),
      this.update,
    );
    this.router.delete(this.path + '/delete/:id', param('id').exists().toInt().isNumeric(), this.delete);
  }
}

export default UserController;
