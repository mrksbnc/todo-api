'use strict';

import { Todo } from '@prisma/client';
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
    await this.repository.create(data);
  }

  public async createMany(dataCollection: ICreateTodoData[]) {
    await this.repository.createMany(dataCollection);
  }

  public async getById(id: number): Promise<Todo> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const todo = await this.repository.findById(id);
    if (!todo) throw ResourceNotFoundError;

    return todo;
  }

  public async findManyByUserId(userId: number) {
    if (!isValidNumericId(userId)) throw InvalidNumericIdError;

    const todoCollection = await this.repository.findManyByUserId(userId);
    return todoCollection;
  }

  public async findManyByListId(listId: number) {
    if (!isValidNumericId(listId)) throw InvalidNumericIdError;

    const todoCollection = await this.repository.findManyByListId(listId);
    return todoCollection;
  }

  public async update(id: number, data: IUpdateTodoData): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    await this.repository.update(id, data);
  }

  public async updateMany(ids: number[], dataCollection: IUpdateTodoData[]): Promise<void> {
    let index = 0;
    let isMinimumOneValidNumericIdFound = false;
    while (!isMinimumOneValidNumericIdFound) {
      if (isValidNumericId(ids[index])) isMinimumOneValidNumericIdFound = true;
      ++index;
    }
    if (!isMinimumOneValidNumericIdFound) throw InvalidArgumentError;

    const validatedIdCollection: number[] = [];
    const validatedPayloadCollection: IUpdateTodoData[] = [];

    for (let iterator = 0; iterator < ids.length; ++iterator) {
      if (isValidNumericId(ids[iterator])) {
        validatedIdCollection.push(ids[iterator]);
        validatedPayloadCollection.push(dataCollection[iterator]);
      }
    }
    await this.repository.updateMany(ids, dataCollection);
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

export default TodoService;
