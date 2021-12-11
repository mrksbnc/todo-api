'use strict';

import { List } from '@prisma/client';
import ListService from '../../services/listService';
import { ExpressRedisCache } from 'express-redis-cache';
import BaseResponse from '../../data/models/baseResponse';
import { NextFunction, Request, Response, Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';
import InvalidArgumentError from '../../data/errors/invalidArgumentError';
import ResponseMessageEnum from '../../data/constants/responseMessageEnum';
import { ICreateListData, IUpdateListData } from '../../data/types/repository';
import contentTypeValidatorMiddleware from '../middlewares/contentTypeValidatorMiddleware';

class ListController {
  public readonly router: Router;
  private readonly path = '/list';
  protected readonly service: ListService;
  private readonly cache: ExpressRedisCache;

  constructor(service: ListService, cache: ExpressRedisCache) {
    this.cache = cache;
    this.service = service;
    this.router = Router();
    this.initializeRoutes();
  }

  private readonly create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const data: ICreateListData = request.body;
      await this.service.create(data);

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse({ message: ResponseMessageEnum.CREATED }));
    } catch (error) {
      next(error);
    }
  };

  private readonly getById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const id = Number(request.params.id);
      const list = await this.service.getById(id);

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse<List>({ data: list }));
    } catch (error) {
      next(error);
    }
  };

  private readonly getMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const { ids }: { ids: number[] } = request.body;
      const collection = await this.service.getMany(ids);

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse<List[]>({ data: collection }));
    } catch (error) {
      next(error);
    }
  };

  private readonly getManyByUserId = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const userId = Number(request.params.userId);
      const listCollection = await this.service.getManyByUserId(userId);

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse<List[]>({ data: listCollection }));
    } catch (error) {
      next(error);
    }
  };

  private readonly update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const { id, data }: { id: number; data: IUpdateListData } = request.body;
      await this.service.update(id, data);

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse({ message: ResponseMessageEnum.UPDATED }));
    } catch (error) {
      next(error);
    }
  };

  private readonly updateMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const { ids, data }: { ids: number[]; data: IUpdateListData[] } = request.body;
      await this.service.updateMany(ids, data);

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse({ message: ResponseMessageEnum.UPDATED_MANY }));
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

  private readonly deleteMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const { ids }: { ids: number[] } = request.body;
      await this.service.deleteMany(ids);

      response.status(HttpStatusCodeEnum.OK).json(new BaseResponse({ message: ResponseMessageEnum.DELETED_MANY }));
    } catch (error) {
      next(error);
    }
  };

  private initializeRoutes() {
    this.router.post(
      this.path + '/' + 'create',
      contentTypeValidatorMiddleware,
      body('name').isLength({ max: 64 }),
      body('userId').toInt().isNumeric(),
      this.create,
    );
    this.router.get(this.path + '/get/:id', param('id').exists().toInt().isNumeric(), this.getById);
    this.router.post(
      this.path + '/getMany',
      this.cache.route(),
      contentTypeValidatorMiddleware,
      body('ids').exists().isArray(),
      this.getMany,
    );
    this.router.get(
      this.path + '/get/user/:userId',
      this.cache.route(),
      param('userId').exists().toInt().isNumeric(),
      this.getManyByUserId,
    );
    this.router.put(
      this.path + '/update',
      contentTypeValidatorMiddleware,
      body('id').exists().toInt().isNumeric(),
      body('data').exists().isObject(),
      this.update,
    );
    this.router.put(
      this.path + '/updateMany',
      contentTypeValidatorMiddleware,
      body('ids').exists().isArray(),
      body('data').exists().isArray(),
      this.updateMany,
    );
    this.router.delete(this.path + '/delete/:id', param('id').exists().toInt().isNumeric(), this.delete);
    this.router.post(
      this.path + '/deleteMany',
      contentTypeValidatorMiddleware,
      body('ids').exists().isArray(),
      this.deleteMany,
    );
  }
}

export default ListController;
