'use strict';

import { Prisma, Todo } from '.prisma/client';
import { ICreateTodoData, IUpdateTodoData } from '../data/types/repository';

class TodoRepositroy {
  private readonly context: Prisma.TodoDelegate<false>;

  constructor(context: Prisma.TodoDelegate<false>) {
    this.context = context;
  }

  public async create(data: ICreateTodoData): Promise<Todo> {
    const queryResult = await this.context.create({ data });
    return queryResult;
  }

  public async createMany(data: ICreateTodoData[]) {
    await this.context.createMany({ data });
  }

  public async findById(id: number): Promise<Todo | null> {
    const queryResult = await this.context.findUnique({ where: { id } });
    return queryResult;
  }

  public async findCountByUserId(userId: number): Promise<number> {
    const queryResult = await this.context.count({ where: { userId } });
    return queryResult;
  }

  public async findImportantCountByUserId(userId: number): Promise<number> {
    const queryResult = await this.context.count({ where: { userId, important: true, completedFl: false } });
    return queryResult;
  }

  public async findCountByListId(listId: number): Promise<number> {
    const queryResult = await this.context.count({ where: { listId, completedFl: false } });
    return queryResult;
  }

  public async findDueTodayCountByUserId(userId: number): Promise<number> {
    const now = new Date(Date.now());
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const tomorrow = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 1));

    const queryResult = await this.context.count({
      where: { userId, dueDate: { gte: today, lt: tomorrow }, completedFl: false },
    });
    return queryResult;
  }

  public async findDueTodayCountByListId(listId: number): Promise<number> {
    const now = new Date(Date.now());
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const tomorrow = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 1));

    const queryResult = await this.context.count({
      where: { listId, dueDate: { gte: today, lt: tomorrow }, completedFl: false },
    });
    return queryResult;
  }

  public async findMany(ids: number[]): Promise<Todo[]> {
    const actionResult = [];

    for (const id of ids) {
      const queryResult = await this.context.findUnique({ where: { id } });
      if (queryResult) actionResult.push(queryResult);
    }

    return actionResult;
  }

  public async findManyByUserId(userId: number): Promise<Todo[]> {
    const queryResult = await this.context.findMany({ where: { userId } });
    return queryResult;
  }

  public async findManyByListId(listId: number): Promise<Todo[]> {
    const queryResult = await this.context.findMany({ where: { listId } });
    return queryResult;
  }

  public async update(id: number, data: IUpdateTodoData): Promise<Todo> {
    const queryResult = await this.context.update({ where: { id }, data });
    return queryResult;
  }

  public async updateMany(ids: number[], collection: IUpdateTodoData[]): Promise<Todo[]> {
    let index = 0;
    const queryResultCollection: Todo[] = [];

    while (index < ids.length) {
      const queryResult = await this.context.update({ where: { id: ids[index] }, data: collection[index] });
      queryResultCollection.push(queryResult);
      ++index;
    }
    return queryResultCollection;
  }

  public async delete(id: number) {
    await this.context.delete({ where: { id } });
  }

  public async deleteMany(ids: number[]): Promise<void> {
    let index = 0;
    while (index < ids.length) {
      await this.context.delete({ where: { id: ids[index] } });
      ++index;
    }
  }
}

export default TodoRepositroy;
