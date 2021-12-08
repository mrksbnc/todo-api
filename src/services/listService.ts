'use strict';

import { List } from '.prisma/client';
import InvalidArgumentError from '../data/errors/invalidArgumentError';
import ResourceNotFoundError from '../data/errors/resourceNotFoundError';
import { ICreateListData, IUpdateListData } from '../data/types/repository';
import ListRepositroy from '../repositories/listRepository';
import { isValidNumericId } from '../utils/validators';

class ListService {
  private readonly repository: ListRepositroy;

  constructor(repository: ListRepositroy) {
    this.repository = repository;
  }

  public async create(data: ICreateListData): Promise<void> {
    await this.repository.create(data);
  }

  public async getById(id: number): Promise<List> {
    if (!isValidNumericId(id)) throw InvalidArgumentError;

    const list = await this.repository.findById(id);
    if (!list) throw ResourceNotFoundError;

    return list;
  }

  public async getByUserId(userId: number): Promise<List[]> {
    if (!isValidNumericId(userId)) throw InvalidArgumentError;

    const listCollection = await this.repository.findManyByUserId(userId);
    return listCollection;
  }

  public async update(id: number, data: IUpdateListData): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidArgumentError;

    await this.repository.update(id, data);
  }

  public async updateMany(ids: number[], data: IUpdateListData[]) {
    let index = 0;
    let foundMinimumOneValidId = false;
    while (!foundMinimumOneValidId) {
      if (isValidNumericId(ids[index])) foundMinimumOneValidId = true;
      ++index;
    }
    if (!foundMinimumOneValidId) throw InvalidArgumentError;

    const validatedIds: number[] = [];
    const validatedData: IUpdateListData[] = [];

    for (let index = 0; index < ids.length; ++index) {
      if (isValidNumericId(ids[index])) {
        validatedIds.push(ids[index]);
        validatedData.push(data[index]);
      }
    }
    await this.repository.updateMany(validatedIds, validatedData);
  }

  public async delete(id: number): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidArgumentError;
    await this.repository.delete(id);
  }

  public async deleteMany(ids: number[]): Promise<void> {
    let index = 0;
    let foundMinimumOneValidId = false;
    while (!foundMinimumOneValidId) {
      if (isValidNumericId(ids[index])) foundMinimumOneValidId = true;
      ++index;
    }
    if (!foundMinimumOneValidId) throw InvalidArgumentError;

    await this.repository.deleteMany(ids);
  }
}

export default ListService;
