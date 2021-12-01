'use strict';

import Validator from 'validatorjs';
import { Collection } from '.prisma/client';
import HttpException from '../data/exceptions/HttpException';
import ApiErrorMessageEnum from '../data/enums/apiErrorMessages';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';
import CollectionRepository from '../repositories/collectionReposiory';
import { isObjectEmpty, isValidNumericId } from '../helpers/validators';
import { IService, IServiceConstructor } from '../data/interfaces/serviceInterfaces';
import { ICreateCollectionArgs, IUpdateCollectionArgs } from '../data/interfaces/repositoryInterfaces';
class CollectionService implements IService<CollectionRepository> {
  public readonly repository;

  constructor({ repository }: IServiceConstructor<CollectionRepository>) {
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
    if (!isValidNumericId(id)) {
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

  public async findManyByCreatedById(createdBy: number): Promise<Collection[]> {
    if (!isValidNumericId(createdBy)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    const collectionList = await this.repository.findManyByCreatedById(createdBy);
    return collectionList;
  }

  public async update({ id, data }: { id: number; data: IUpdateCollectionArgs }): Promise<void> {
    if (!isValidNumericId(id) || isObjectEmpty<IUpdateCollectionArgs>(data)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    await this.repository.update({ id, data });
  }

  public async delete(id: number): Promise<void> {
    if (!isValidNumericId(id)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    await this.repository.delete(id);
  }
}

export default CollectionService;
