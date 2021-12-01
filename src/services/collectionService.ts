'use strict';

import Validator from 'validatorjs';
import ServiceHelper from './serviceHelper';
import { Collection } from '.prisma/client';
import HttpException from '../data/exceptions/HttpException';
import ApiErrorMessageEnum from '../data/enums/apiErrorMessages';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';
import CollectionRepository from '../repositories/collectionReposiory';
import { ICreateCollectionArgs } from '../data/interfaces/repositoryInterfaces';
import { IService, IServiceConstructor } from '../data/interfaces/serviceInterfaces';

class CollectionService extends ServiceHelper implements IService<CollectionRepository> {
  readonly repository;

  constructor({ repository }: IServiceConstructor<CollectionRepository>) {
    super();
    this.repository = repository;
  }

  public async create(args: ICreateCollectionArgs): Promise<void> {
    const createCollectionObjectValidationRule = {
      collectionName: 'required|max:30',
      description: 'max:120',
      createdBy: 'required|alpha_num',
    };

    const validator = new Validator(args, createCollectionObjectValidationRule);
    if (validator.fails()) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }
    await this.repository.create(args);
  }

  public async findById(id: number): Promise<Collection | null> {
    if (!this.isValidNumericId(id)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    const collection = await this.repository.findById(id);
    if (!collection) {
      throw new HttpException({
        message: ApiErrorMessageEnum.NOT_FOUND,
        statusCode: HttpStatusCodeEnum.NOT_FOUND,
      });
    }

    return collection;
  }
}

export default CollectionService;
