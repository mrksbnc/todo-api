'use strict';

import ProjectService from '../../services/projectService';
import { NextFunction, Request, Response, Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import { ICreateProjectData } from '../../data/types/createTypes';
import { IUpdateProjectData } from '../../data/types/updateTypes';
import InvalidArgumentError from '../../errors/invalidArgumentError';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';
import ResponseMessageEnum from '../../data/enums/responseMessageEnum';
import contentTypeValidatorMiddleware from '../middlewares/contentTypeValidatorMiddleware';

class ProjectController {
  public readonly router: Router;
  private readonly path = '/project';
  protected readonly service: ProjectService;

  constructor(service: ProjectService) {
    this.service = service;
    this.router = Router();
    this.initializeRoutes();
  }

  private readonly create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const data: ICreateProjectData = request.body;
      await this.service.create(data);

      response.status(HttpStatusCodeEnum.OK).json({ message: ResponseMessageEnum.CREATED });
    } catch (error) {
      next(error);
    }
  };

  private readonly getById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const id = Number(request.params.id);
      const project = await this.service.getById(id);

      response.status(HttpStatusCodeEnum.OK).json({ project });
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

  private readonly getMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const { ids }: { ids: number[] } = request.body;
      const collection = await this.service.getMany(ids);

      response.status(HttpStatusCodeEnum.OK).json({ collection });
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
      const collection = await this.service.getManyByUserId(userId);

      response.status(HttpStatusCodeEnum.OK).json({ collection });
    } catch (error) {
      next(error);
    }
  };

  private readonly update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const { id, data }: { id: number; data: IUpdateProjectData } = request.body;
      await this.service.update(id, data);

      response.status(HttpStatusCodeEnum.OK).json({ message: ResponseMessageEnum.UPDATED });
    } catch (error) {
      next(error);
    }
  };

  private readonly updateMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const { ids, data }: { ids: number[]; data: IUpdateProjectData[] } = request.body;
      await this.service.updateMany(ids, data);

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
      await this.service.delete(id);

      response.status(HttpStatusCodeEnum.OK).json({ message: ResponseMessageEnum.DELETED });
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

      response.status(HttpStatusCodeEnum.OK).json({ message: ResponseMessageEnum.DELETED_MANY });
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
    this.router.get(
      this.path + '/get/count/:userId',
      param('userId').exists().toInt().isNumeric(),
      this.getCountByUserId,
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

export default ProjectController;
