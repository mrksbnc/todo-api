'use strict';

import { List } from '@prisma/client';
import { isValidNumericId } from '../utils/validators';
import ListRepositroy from '../repositories/listRepository';
import InvalidArgumentError from '../data/errors/invalidArgumentError';
import InvalidNumericIdError from '../data/errors/invalidNumericIdError';
import ResourceNotFoundError from '../data/errors/resourceNotFoundError';
import { ICreateListData, IUpdateListData } from '../data/types/repository';

class ListService {
  private readonly repository: ListRepositroy;

  constructor(repository: ListRepositroy) {
    this.repository = repository;
  }

  public async create(data: ICreateListData): Promise<void> {
    await this.repository.create(data);
  }

  public async getById(id: number): Promise<List> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const list = await this.repository.findById(id);
    if (!list) throw ResourceNotFoundError;

    return list;
  }

  public async getManyByUserId(userId: number): Promise<List[]> {
    if (!isValidNumericId(userId)) throw InvalidNumericIdError;

    const listCollection = await this.repository.findManyByUserId(userId);
    return listCollection;
  }

  public async update(id: number, data: IUpdateListData): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    await this.repository.update(id, data);
  }

  public async updateMany(ids: number[], collection: IUpdateListData[]): Promise<void> {
    let index = 0;
    let isMinimumOneValidNumericIdFound = false;
    while (!isMinimumOneValidNumericIdFound) {
      if (isValidNumericId(ids[index])) isMinimumOneValidNumericIdFound = true;
      ++index;
    }
    if (!isMinimumOneValidNumericIdFound) throw InvalidArgumentError;

    const validatedIdCollection: number[] = [];
    const validatedPayloadCollection: IUpdateListData[] = [];

    for (let iterator = 0; iterator < ids.length; ++iterator) {
      if (isValidNumericId(ids[iterator])) {
        validatedIdCollection.push(ids[iterator]);
        validatedPayloadCollection.push(collection[iterator]);
      }
    }
    await this.repository.updateMany(ids, collection);
  }

  public async delete(id: number): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    await this.repository.delete(id);
  }

  public async deleteMany(ids: number[]): Promise<void> {
    let index = 0;
    let isMinimumOneValidNumericIdFound = false;
    while (!isMinimumOneValidNumericIdFound) {
      if (isValidNumericId(ids[index])) isMinimumOneValidNumericIdFound = true;
      ++index;
    }
    if (!isMinimumOneValidNumericIdFound) throw InvalidArgumentError;

    let validatedIds: number[] = [];
    for (const id of ids) {
      if (isValidNumericId(id)) validatedIds.push(id);
    }

    await this.repository.deleteMany(validatedIds);
  }
}

export default ListService;
