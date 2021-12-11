'use strict';

import cache from '../utils/cache';
import { List } from '.prisma/client';
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
    const actionResult = await this.repository.create(data);
    const key = cache.createKey('list', actionResult.id, 'user', actionResult.userId);

    cache.set<List>(key, actionResult);
  }

  public async getById(id: number, userId: number): Promise<List> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const key = cache.createKey('list', id, 'user', userId);
    const has = cache.has(key);
    if (has) {
      const list = cache.get<List>(key);
      if (list) return list;
    }

    const list = await this.repository.findById(id);
    if (!list) throw ResourceNotFoundError;

    cache.set<List>(key, list);
    return list;
  }

  public async getMany(ids: number[], userId: number) {
    const validIds: number[] = [];
    for (const id of ids) {
      if (isValidNumericId(id)) validIds.push(id);
    }
    if (validIds.length === 0) throw InvalidArgumentError;

    let resultCollection: List[] = [];
    const keys = validIds.map((id) => {
      return cache.createKey('list', id, 'user', userId);
    });

    const collection = cache.mget<List>(keys);
    if (Object.keys(collection).length !== 0) {
      for (const key in collection) {
        if (collection[key]) {
          const value = collection[key];
          if (value) resultCollection.push(value);
        } else {
          const id = Number(key.split('list')[1].split('.')[1]);
          const dbValue = await this.repository.findById(id);
          if (dbValue) {
            resultCollection.push(dbValue);
            cache.set<List>(key, dbValue);
          }
        }
      }
    } else {
      resultCollection = await this.repository.findMany(validIds);
      let index = 0;
      while (index < resultCollection.length) {
        const key = cache.createKey('list', resultCollection[index].id, 'user', userId);
        cache.set(key, resultCollection[index]);
        index++;
      }
    }
    return resultCollection;
  }

  public async getManyByUserId(userId: number): Promise<List[]> {
    if (!isValidNumericId(userId)) throw InvalidNumericIdError;

    let resultCollection: List[] = [];
    const key = cache.createKey('user', userId);
    const keys = cache.listKeys().filter((f) => f.includes(key));

    const collection = cache.mget<List>(keys);
    if (Object.keys(collection).length !== 0) {
      for (const key in collection) {
        if (collection[key]) {
          const value = collection[key];
          if (value) resultCollection.push(value);
        } else {
          const id = key.split('list')[1].split('.')[1];
          const dbValue = await this.repository.findById(Number(id));
          if (dbValue) {
            resultCollection.push(dbValue);
            cache.set<List>(key, dbValue);
          }
        }
      }
    } else {
      resultCollection = await this.repository.findManyByUserId(userId);
      let index = 0;
      while (index < resultCollection.length) {
        const key = cache.createKey('list', resultCollection[index].id, 'user', userId);
        cache.set(key, resultCollection[index]);
        index++;
      }
    }
    return resultCollection;
  }

  public async update(id: number, data: IUpdateListData, userId: number): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const key = cache.createKey('list', id, 'user', userId);
    if (cache.has(key)) cache.del(key);

    const actionResult = await this.repository.update(id, data);
    cache.set(key, actionResult);
  }

  public async updateMany(ids: number[], collection: IUpdateListData[], userId: number): Promise<void> {
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

    const actionResult = await this.repository.updateMany(validatedIdCollection, validatedPayloadCollection);
    validatedIdCollection.map((m, i) => {
      const k = cache.createKey('list', m, 'user', userId);
      if (cache.has(k)) cache.del(k);
      cache.set<List>(k, actionResult[i]);
    });
  }

  public async delete(id: number, userId: number): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const key = cache.createKey('list', id, 'user', userId);

    if (cache.has(key)) {
      cache.del(key);
    }
    await this.repository.delete(id);
  }

  public async deleteMany(ids: number[], userId: number): Promise<void> {
    let index = 0;
    let isMinimumOneValidNumericIdFound = false;
    while (!isMinimumOneValidNumericIdFound) {
      if (isValidNumericId(ids[index])) isMinimumOneValidNumericIdFound = true;
      ++index;
    }
    if (!isMinimumOneValidNumericIdFound) throw InvalidArgumentError;

    const validatedIds: number[] = [];
    for (const id of ids) {
      if (isValidNumericId(id)) validatedIds.push(id);
    }

    validatedIds.map((m) => {
      const k = cache.createKey('list', m, 'user', userId);
      if (cache.has(k)) cache.del(k);
    });

    await this.repository.deleteMany(validatedIds);
  }
}

export default ListService;
