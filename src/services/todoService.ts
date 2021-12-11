'use strict';

import cache from '../utils/cache';
import { Todo } from '.prisma/client';
import { isValidNumericId } from '../utils/validators';
import TodoRepositroy from '../repositories/todoRepository';
import InvalidArgumentError from '../data/errors/invalidArgumentError';
import InvalidNumericIdError from '../data/errors/invalidNumericIdError';
import ResourceNotFoundError from '../data/errors/resourceNotFoundError';
import { ICreateTodoData, IUpdateTodoData } from '../data/types/repository';

class TodoService {
  private readonly repository: TodoRepositroy;

  constructor(repository: TodoRepositroy) {
    this.repository = repository;
  }

  public async create(data: ICreateTodoData): Promise<void> {
    const actionResult = await this.repository.create(data);
    let key = cache.createKey('todo', actionResult.id, 'user', actionResult.userId);
    if (actionResult.listId) {
      key = cache.createKey('todo', actionResult.id, 'user', actionResult.userId, 'list', actionResult.listId);
    }
    cache.set<Todo>(key, actionResult);
  }

  public async createMany(collection: ICreateTodoData[]) {
    await this.repository.createMany(collection);
  }

  public async getById(id: number, userId: number): Promise<Todo> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const key = cache.createKey('todo', id, 'user', userId);
    const has = cache.has(key);
    if (has) {
      const todo = cache.get<Todo>(key);
      if (todo) {
        if (todo.listId) {
          const isListIdPresentInKey = key.includes('list.');
          if (!isListIdPresentInKey) {
            const newKey = cache.createKey('todo', id, 'user', userId, 'list', todo.listId);
            cache.del(key);
            cache.set<Todo>(newKey, todo);
          }
        }

        return todo;
      }
    }

    const todo = await this.repository.findById(id);
    if (!todo) throw ResourceNotFoundError;

    cache.set<Todo>(key, todo);
    return todo;
  }

  public async getMany(ids: number[], userId: number) {
    const validIds: number[] = [];
    for (const id of ids) {
      if (isValidNumericId(id)) validIds.push(id);
    }
    if (validIds.length === 0) throw InvalidArgumentError;

    const keyCollection = validIds.map((m) => {
      return cache.createKey('todo', m, 'user', userId);
    });
    let resultCollection: Todo[] = [];
    const collection = cache.mget<Todo>(keyCollection);

    if (Object.keys(collection).length !== 0) {
      for (const key in collection) {
        if (collection[key]) {
          const value = collection[key];
          if (value) resultCollection.push(value);
        } else {
          const id = Number(key.split('todo')[1].split('.')[1]);
          const dbValue = await this.repository.findById(id);
          if (dbValue) {
            console.log(dbValue);
            resultCollection.push(dbValue);
            cache.set<Todo>(key, dbValue);
          }
        }
      }
    } else {
      resultCollection = await this.repository.findMany(ids);
      let index = 0;
      while (index < resultCollection.length) {
        const key = cache.createKey('todo', resultCollection[index].id, 'user', userId);
        cache.set(key, resultCollection[index]);
        index++;
      }
    }

    return resultCollection;
  }

  public async getManyByUserId(userId: number): Promise<Todo[]> {
    if (!isValidNumericId(userId)) throw InvalidNumericIdError;

    let resultCollection: Todo[] = [];
    const key = cache.createKey('user', userId);
    const keys = cache.listKeys().filter((f) => f.includes(key));

    const collection = cache.mget<Todo>(keys);
    if (Object.keys(collection).length !== 0) {
      for (const key in collection) {
        if (collection[key]) {
          const value = collection[key];
          if (value) resultCollection.push(value);
        } else {
          const id = key.split('todo')[1].split('.')[1];
          const dbValue = await this.repository.findById(Number(id));
          if (dbValue) {
            resultCollection.push(dbValue);
            cache.set<Todo>(key, dbValue);
          }
        }
      }
    } else {
      resultCollection = await this.repository.findManyByUserId(userId);
      let index = 0;
      while (index < resultCollection.length) {
        const key = cache.createKey('todo', resultCollection[index].id, 'user', userId);
        cache.set(key, resultCollection[index]);
        index++;
      }
    }

    return resultCollection;
  }

  public async getManyByListId(listId: number): Promise<Todo[]> {
    if (!isValidNumericId(listId)) throw InvalidNumericIdError;

    let resultCollection: Todo[] = [];
    const key = cache.createKey('list', listId);
    const keys = cache.listKeys().filter((f) => f.includes(key));

    const collection = cache.mget<Todo>(keys);
    if (Object.keys(collection).length !== 0) {
      for (const key in collection) {
        if (collection[key]) {
          const value = collection[key];
          if (value) resultCollection.push(value);
        } else {
          const id = key.split('todo')[1].split('.')[1];
          const dbValue = await this.repository.findById(Number(id));
          if (dbValue) {
            resultCollection.push(dbValue);
            cache.set<Todo>(key, dbValue);
          }
          return resultCollection;
        }
      }
    } else {
      resultCollection = await this.repository.findManyByListId(listId);
      let index = 0;
      while (index < resultCollection.length) {
        const key = cache.createKey(
          'todo',
          resultCollection[index].id,
          'user',
          resultCollection[index].userId,
          'list',
          listId,
        );
        cache.set(key, resultCollection[index]);
        index++;
      }
    }

    return resultCollection;
  }

  public async update(id: number, data: IUpdateTodoData): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const key = cache.createKey('todo', id);
    const completeKey = cache.listKeys().filter((f) => f.includes(key))[0];
    const has = cache.has(completeKey);

    if (has) cache.del(completeKey[0]);

    const actionResult = await this.repository.update(id, data);
    let newKey = cache.createKey('todo', actionResult.id, 'user', actionResult.userId);

    if (actionResult.listId) {
      newKey = cache.createKey('todo', actionResult.id, 'user', actionResult.userId, 'list', actionResult.listId);
    }

    cache.set<Todo>(newKey, actionResult);
  }

  public async updateMany(ids: number[], dataCollection: IUpdateTodoData[]): Promise<void> {
    let index = 0;
    let isMinimumOneValidNumericIdFound = false;
    while (!isMinimumOneValidNumericIdFound) {
      if (isValidNumericId(ids[index])) isMinimumOneValidNumericIdFound = true;
      ++index;
    }
    if (!isMinimumOneValidNumericIdFound) throw InvalidArgumentError;

    const keyCollection = ids.map((m) => {
      return cache.createKey('todo', m);
    });

    const completeKeys: string[] = [];
    const cacheKeyList = cache.listKeys();

    for (let i = 0; i < cacheKeyList.length; ++i) {
      for (let j = 0; j < keyCollection.length; ++j) {
        if (cacheKeyList[i].includes(keyCollection[j])) {
          completeKeys.push(cacheKeyList[i]);
        }
      }
    }

    if (completeKeys.length > 0) {
      cache.mDel(completeKeys);
    }

    const validatedIdCollection: number[] = [];
    const validatedPayloadCollection: IUpdateTodoData[] = [];

    for (let iterator = 0; iterator < ids.length; ++iterator) {
      if (isValidNumericId(ids[iterator])) {
        validatedIdCollection.push(ids[iterator]);
        validatedPayloadCollection.push(dataCollection[iterator]);
      }
    }
    const actionResult = await this.repository.updateMany(ids, dataCollection);
    index = 0;
    while (index < actionResult.length) {
      let key = cache.createKey('todo', actionResult[index].id, 'user', actionResult[index].userId);
      if (actionResult[index].listId) {
        const listId = Number(actionResult[index].listId);
        key = cache.createKey('todo', actionResult[index].id, 'user', actionResult[index].userId, 'list', listId);
      }
      cache.set(key, actionResult[index]);
      index++;
    }
  }

  public async delete(id: number): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const key = cache.createKey('todo', id);
    const completeKey = cache.listKeys().filter((f) => f.includes(key))[0];

    await this.repository.delete(id);

    if (completeKey) {
      cache.del(completeKey);
    }
  }

  public async deleteMany(ids: number[]): Promise<void> {
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

    if (validatedIds.length === 0) throw InvalidArgumentError;

    const keyCollection = validatedIds.map((m) => {
      return cache.createKey('todo', m);
    });

    const completeKeys: string[] = [];
    const cacheKeyList = cache.listKeys();

    for (let i = 0; i < cacheKeyList.length; ++i) {
      for (let j = 0; j < keyCollection.length; ++j) {
        if (cacheKeyList[i].includes(keyCollection[j])) {
          completeKeys.push(cacheKeyList[i]);
        }
      }
    }

    await this.repository.deleteMany(validatedIds);

    if (completeKeys.length > 0) {
      cache.mDel(completeKeys);
    }
  }
}

export default TodoService;
