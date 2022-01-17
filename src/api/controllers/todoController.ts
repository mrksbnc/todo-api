'use strict';

import { Todo } from '.prisma/client';
import cache from '../../utils/cache';
import TodoService from '../../services/todoService';
import { CreateTodoData } from '../../types/createModels';
import { UpdateTodoData } from '../../types/updateModels';
import { body, param, validationResult } from 'express-validator';
import { NextFunction, Request, Response, Router } from 'express';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';
import InvalidArgumentError from '../../errors/invalidArgumentError';
import ResponseMessageEnum from '../../data/enums/responseMessageEnum';
import ResourceNotFoundError from '../../errors/resourceNotFoundError';
import contentTypeValidatorMiddleware from '../middlewares/contentTypeValidatorMiddleware';

class TodoController {
  public readonly router: Router;
  private readonly path = '/todo';
  protected readonly service: TodoService;

  constructor(service: TodoService) {
    this.service = service;
    this.router = Router();
    this.initializeRoutes();
  }

  private readonly create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const data: CreateTodoData = request.body;
      const todo = await this.service.create(data);

      const key = this.path + ' /get/' + todo.id;
      await cache.set<Todo>(key, todo);

      response.status(HttpStatusCodeEnum.CREATED).json({ message: ResponseMessageEnum.CREATED });
    } catch (error) {
      next(error);
    }
  };

  private readonly getById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const key = request.path;
      const cachedValue = await cache.get<Todo>(key);
      const dto: { todo?: Todo } = { todo: undefined };

      if (cachedValue) {
        dto.todo = cachedValue;
      } else {
        const id = Number(request.params.id);
        const todo = await this.service.getById(id);

        await cache.set<Todo>(key, todo);
        dto.todo = todo;
      }

      response.status(HttpStatusCodeEnum.OK).json(dto);
    } catch (error) {
      next(error);
    }
  };

  private readonly getCountByUserId = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const userId = Number(request.params.userId);
      const count = await this.service.getCountByUserId(userId);

      response.status(HttpStatusCodeEnum.OK).json({ count });
    } catch (error) {
      next(error);
    }
  };

  private readonly getCountByListId = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const listId = Number(request.params.listId);
      const count = await this.service.getCountByListId(listId);

      response.status(HttpStatusCodeEnum.OK).json({ count });
    } catch (error) {
      next(error);
    }
  };

  private readonly getDueTodayCountByUserId = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const userId = Number(request.params.userId);
      const count = await this.service.getDueTodayCountByUserId(userId);

      response.status(HttpStatusCodeEnum.OK).json({ count });
    } catch (error) {
      next(error);
    }
  };

  private readonly getDueTodayCountByListId = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const listId = Number(request.params.listId);
      const count = await this.service.getDueTodayCountByListId(listId);

      response.status(HttpStatusCodeEnum.OK).json({ count });
    } catch (error) {
      next(error);
    }
  };

  private readonly getMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const key = request.path;
      const cachedValues = await cache.get<Todo[]>(key);
      const dto: { collection: Todo[] } = { collection: [] };

      if (cachedValues && cachedValues.length) {
        dto.collection = cachedValues;
      } else {
        const { ids }: { ids: number[] } = request.body;
        const collection = await this.service.getMany(ids);

        await cache.set<Todo[]>(key, collection);
        dto.collection = collection;
      }

      response.status(HttpStatusCodeEnum.OK).json(dto);
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

      const key = request.path;
      const cachedValues = await cache.get<Todo[]>(key);
      const dto: { collection: Todo[] } = { collection: [] };

      if (cachedValues && cachedValues.length) {
        dto.collection = cachedValues;
      } else {
        const userId = Number(request.params.userId);
        const collection = await this.service.getManyByUserId(userId);

        await cache.set<Todo[]>(key, collection);
        dto.collection = collection;
      }

      response.status(HttpStatusCodeEnum.OK).json(dto);
    } catch (error) {
      next(error);
    }
  };

  private readonly getManyByListId = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) next(InvalidArgumentError);

        const key = request.path;
        const cachedValues = await cache.get<Todo[]>(key);
        const dto: { collection: Todo[] } = { collection: [] };

        if (cachedValues && cachedValues.length) {
          dto.collection = cachedValues;
        } else {
          const listId = Number(request.params.listId);
          const collection = await this.service.getManyByListId(listId);

          await cache.set<Todo[]>(key, collection);
          dto.collection = collection;
        }

        response.status(HttpStatusCodeEnum.OK).json(dto);
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  };

  private readonly getImportantCountByUserId = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const userId = Number(request.params.userId);
      const count = await this.service.getImportantCountByUserId(userId);

      response.status(HttpStatusCodeEnum.OK).json({ count });
    } catch (error) {
      next(error);
    }
  };

  private readonly update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const { id, data }: { id: number; data: UpdateTodoData } = request.body;
      const updateResultTodo = await this.service.update(id, data);

      const basicKey = this.path + '/get/' + updateResultTodo.id;
      const listKey = this.path + '/get/list/' + updateResultTodo.listId;
      const userKey = this.path + '/get/user/' + updateResultTodo.userId;

      await cache.set(basicKey, updateResultTodo);
      await cache.set(listKey, updateResultTodo);
      await cache.set(userKey, updateResultTodo);

      response.status(HttpStatusCodeEnum.OK).json({ message: ResponseMessageEnum.UPDATED });
    } catch (error) {
      next(error);
    }
  };

  private readonly updateMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      let index = 0;
      const { ids, data }: { ids: number[]; data: UpdateTodoData[] } = request.body;
      const updateResultTodoList = await this.service.updateMany(ids, data);

      while (index < updateResultTodoList.length) {
        const iterated = updateResultTodoList[index];

        const basicKey = this.path + '/get/' + iterated.id;
        const listKey = this.path + '/get/list/' + iterated.listId;
        const userKey = this.path + '/get/user/' + iterated.userId;

        await cache.set(basicKey, iterated);
        await cache.set(listKey, iterated);
        await cache.set(userKey, iterated);
        ++index;
      }

      response.status(HttpStatusCodeEnum.OK).json({ message: ResponseMessageEnum.UPDATED_MANY });
    } catch (error) {
      next(error);
    }
  };

  private readonly delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const id = Number(request.params.id);
      const todo = await this.service.getById(id);

      if (todo) {
        const basicKey = this.path + '/get/' + todo.id;
        const listKey = this.path + '/get/list/' + todo.listId;
        const userKey = this.path + '/get/user/' + todo.userId;

        await this.service.delete(id);
        await cache.delete(basicKey);
        await cache.delete(listKey);
        await cache.delete(userKey);

        response.status(HttpStatusCodeEnum.OK).json({ message: ResponseMessageEnum.DELETED });
      } else {
        next(ResourceNotFoundError);
      }
    } catch (error) {
      next(error);
    }
  };

  private readonly deleteMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      let index = 0;
      const { ids }: { ids: number[] } = request.body;
      await this.service.deleteMany(ids);

      while (index < ids.length) {
        const iteratedId = ids[index];
        const todo = await this.service.getById(iteratedId);

        const basicKey = this.path + '/get/' + todo.id;
        const listKey = this.path + '/get/list/' + todo.listId;
        const userKey = this.path + '/get/user/' + todo.userId;

        await cache.delete(basicKey);
        await cache.delete(listKey);
        await cache.delete(userKey);
        ++index;
      }

      response.status(HttpStatusCodeEnum.OK).json({ message: ResponseMessageEnum.DELETED_MANY });
    } catch (error) {
      next(error);
    }
  };

  private initializeRoutes() {
    this.router.post(
      this.path + '/create',
      contentTypeValidatorMiddleware,
      body('name').exists().isLength({ max: 64 }),
      body('userId').exists().toInt().isNumeric(),
      this.create,
    );
    this.router.get(this.path + '/get/:id', param('id').exists().toInt().isNumeric(), this.getById);
    this.router.get(
      this.path + '/get/count/list/:listId',
      param('listId').exists().toInt().isNumeric(),
      this.getCountByListId,
    );
    this.router.get(
      this.path + '/get/count/user/:userId',
      param('userId').exists().toInt().isNumeric(),
      this.getCountByUserId,
    );
    this.router.get(
      this.path + '/get/count/user/important/:userId',
      param('userId').exists().toInt().isNumeric(),
      this.getImportantCountByUserId,
    );
    this.router.get(
      this.path + '/get/count/date/list/:listId',
      param('listId').exists().toInt().isNumeric(),
      this.getDueTodayCountByListId,
    );
    this.router.get(
      this.path + '/get/count/date/user/:userId',
      param('userId').exists().toInt().isNumeric(),
      this.getDueTodayCountByUserId,
    );
    this.router.post(
      this.path + '/getMany',
      contentTypeValidatorMiddleware,
      body('ids').exists().isArray(),
      this.getMany,
    );
    this.router.get(
      this.path + '/get/user/:userId',
      param('userId').exists().toInt().isNumeric(),
      this.getManyByUserId,
    );
    this.router.get(
      this.path + '/get/list/:listId',
      param('listId').exists().toInt().isNumeric(),
      this.getManyByListId,
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

export default TodoController;
