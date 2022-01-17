'use strict';

import { Todo } from '.prisma/client';
import { isValidNumericId } from '../validators';
import { CreateTodoData } from '../types/createModels';
import { UpdateTodoData } from '../types/updateModels';
import TodoRepositroy from '../repositories/todoRepository';
import InvalidArgumentError from '../errors/invalidArgumentError';
import InvalidNumericIdError from '../errors/invalidNumericIdError';
import ResourceNotFoundError from '../errors/resourceNotFoundError';

class TodoService {
  private readonly repository: TodoRepositroy;

  constructor(repository: TodoRepositroy) {
    this.repository = repository;
  }

  public async create(data: CreateTodoData): Promise<void> {
    await this.repository.create(data);
  }

  public async createMany(collection: CreateTodoData[]) {
    const formatted = collection.map((m) => {
      if (m.dueDate) {
        m.dueDate = new Date(m.dueDate);
      }
      return m;
    });
    await this.repository.createMany(formatted);
  }

  public async getById(id: number): Promise<Todo> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const todo = await this.repository.findById(id);
    if (!todo) throw ResourceNotFoundError;

    return todo;
  }

  public async getMany(ids: number[]) {
    const validIds: number[] = [];
    for (const id of ids) {
      if (isValidNumericId(id)) validIds.push(id);
    }
    if (validIds.length === 0) throw InvalidArgumentError;

    const collection = await this.repository.findMany(validIds);
    return collection;
  }

  public async getCountByUserId(userId: number): Promise<number> {
    if (!isValidNumericId(userId)) throw InvalidNumericIdError;

    const count = await this.repository.findCountByUserId(userId);
    return count;
  }

  public async getCountByListId(listId: number): Promise<number> {
    if (!isValidNumericId(listId)) throw InvalidNumericIdError;

    const count = await this.repository.findCountByUserId(listId);
    return count;
  }

  public async getDueTodayCountByListId(userId: number): Promise<number> {
    if (!isValidNumericId(userId)) throw InvalidNumericIdError;

    const count = await this.repository.findDueTodayCountByListId(userId);
    return count;
  }

  public async getDueTodayCountByUserId(userId: number): Promise<number> {
    if (!isValidNumericId(userId)) throw InvalidNumericIdError;

    const count = await this.repository.findDueTodayCountByUserId(userId);
    return count;
  }

  public async getImportantCountByUserId(userId: number): Promise<number> {
    if (!isValidNumericId(userId)) throw InvalidNumericIdError;

    const count = await this.repository.findImportantCountByUserId(userId);
    return count;
  }

  public async getManyByUserId(userId: number): Promise<Todo[]> {
    if (!isValidNumericId(userId)) throw InvalidNumericIdError;

    const collection = await this.repository.findManyByUserId(userId);
    return collection;
  }

  public async getManyByListId(listId: number): Promise<Todo[]> {
    if (!isValidNumericId(listId)) throw InvalidNumericIdError;

    const collection = await this.repository.findManyByListId(listId);
    return collection;
  }

  public async update(id: number, data: UpdateTodoData): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;
    await this.repository.update(id, data);
  }

  public async updateMany(ids: number[], dataCollection: UpdateTodoData[]): Promise<void> {
    let index = 0;
    let isMinimumOneValidNumericIdFound = false;
    while (!isMinimumOneValidNumericIdFound) {
      if (isValidNumericId(ids[index])) isMinimumOneValidNumericIdFound = true;
      ++index;
    }
    if (!isMinimumOneValidNumericIdFound) throw InvalidArgumentError;

    const validatedIdCollection: number[] = [];
    const validatedPayloadCollection: UpdateTodoData[] = [];

    for (let iterator = 0; iterator < ids.length; ++iterator) {
      if (isValidNumericId(ids[iterator])) {
        validatedIdCollection.push(ids[iterator]);
        validatedPayloadCollection.push(dataCollection[iterator]);
      }
    }

    await this.repository.updateMany(validatedIdCollection, validatedPayloadCollection);
  }

  public async delete(id: number): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;
    await this.repository.delete(id);
  }

  public async deleteMany(ids: number[]): Promise<void> {
    let index = 0;
    const validatedIds: number[] = [];
    let isMinimumOneValidNumericIdFound = false;

    while (!isMinimumOneValidNumericIdFound) {
      if (isValidNumericId(ids[index])) isMinimumOneValidNumericIdFound = true;
      ++index;
    }
    if (!isMinimumOneValidNumericIdFound) throw InvalidArgumentError;

    for (const id of ids) {
      if (isValidNumericId(id)) validatedIds.push(id);
    }
    if (validatedIds.length === 0) throw InvalidArgumentError;

    await this.repository.deleteMany(validatedIds);
  }
}

export default TodoService;
