'use strict';

import ProjectService from '../../services/projectService';
import { CreateProjectData } from '../../types/createModels';
import { UpdateProjectData } from '../../types/updateModels';
import { NextFunction, Request, Response, Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import InvalidArgumentError from '../../errors/invalidArgumentError';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';
import ResponseMessageEnum from '../../data/enums/responseMessageEnum';
import contentTypeValidatorMiddleware from '../middlewares/contentTypeValidatorMiddleware';
import BaseResponse from '../../data/models/baseResponse';
import { isResponseOk } from '../../utils/response';
import { Project } from '@prisma/client';
import { GetManyProjectDTO, GetProjectByIdDTO, GetProjectCountDTO } from '../../types/dto';

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

      const data: CreateProjectData = request.body;
      await this.service.create(data);

      response.status(HttpStatusCodeEnum.OK).json(
        new BaseResponse({
          dto: null,
          status: HttpStatusCodeEnum.CREATED,
          message: ResponseMessageEnum.CREATED,
          isOk: isResponseOk(HttpStatusCodeEnum.CREATED),
        }),
      );
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
      const dto: GetProjectByIdDTO = { project };

      response.status(HttpStatusCodeEnum.OK).json(
        new BaseResponse<GetProjectByIdDTO>({
          dto,
          status: HttpStatusCodeEnum.OK,
          message: ResponseMessageEnum.OK,
          isOk: isResponseOk(HttpStatusCodeEnum.OK),
        }),
      );
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
      const dto: GetProjectCountDTO = { count };

      response.status(HttpStatusCodeEnum.OK).json(
        new BaseResponse<GetProjectCountDTO>({
          dto,
          status: HttpStatusCodeEnum.OK,
          message: ResponseMessageEnum.OK,
          isOk: isResponseOk(HttpStatusCodeEnum.OK),
        }),
      );
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
      const dto: GetManyProjectDTO = { collection };

      response.status(HttpStatusCodeEnum.OK).json(
        new BaseResponse<GetManyProjectDTO>({
          dto,
          status: HttpStatusCodeEnum.OK,
          message: ResponseMessageEnum.OK,
          isOk: isResponseOk(HttpStatusCodeEnum.OK),
        }),
      );
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
      const dto: GetManyProjectDTO = { collection };

      response.status(HttpStatusCodeEnum.OK).json(
        new BaseResponse<GetManyProjectDTO>({
          dto,
          status: HttpStatusCodeEnum.OK,
          message: ResponseMessageEnum.OK,
          isOk: isResponseOk(HttpStatusCodeEnum.OK),
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  private readonly update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const { id, data }: { id: number; data: UpdateProjectData } = request.body;
      await this.service.update(id, data);

      response.status(HttpStatusCodeEnum.OK).json(
        new BaseResponse({
          dto: null,
          status: HttpStatusCodeEnum.OK,
          message: ResponseMessageEnum.UPDATED,
          isOk: isResponseOk(HttpStatusCodeEnum.OK),
        }),
      );
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

      response.status(HttpStatusCodeEnum.OK).json(
        new BaseResponse({
          dto: null,
          status: HttpStatusCodeEnum.OK,
          message: ResponseMessageEnum.DELETED,
          isOk: isResponseOk(HttpStatusCodeEnum.OK),
        }),
      );
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

      response.status(HttpStatusCodeEnum.OK).json(
        new BaseResponse({
          dto: null,
          status: HttpStatusCodeEnum.OK,
          message: ResponseMessageEnum.DELETED_MANY,
          isOk: isResponseOk(HttpStatusCodeEnum.OK),
        }),
      );
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
