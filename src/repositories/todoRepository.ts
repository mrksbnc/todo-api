'use strict';

import { Prisma, Todo } from '.prisma/client';
import { ICreateTodoData } from '../data/types/createTypes';
import { IUpdateTodoData } from '../data/types/updateTypes';

class TodoRepositroy {
  private readonly delegate: Prisma.TodoDelegate<false>;

  constructor(delegate: Prisma.TodoDelegate<false>) {
    this.delegate = delegate;
  }

  public async create(data: ICreateTodoData): Promise<Todo> {
    const queryResult = await this.delegate.create({ data });
    return queryResult;
  }

  public async createMany(data: ICreateTodoData[]) {
    await this.delegate.createMany({ data });
  }

  public async findById(id: number): Promise<Todo | null> {
    const queryResult = await this.delegate.findUnique({ where: { id } });
    return queryResult;
  }

  public async findMany(ids: number[]): Promise<Todo[]> {
    const actionResult = [];

    for (const id of ids) {
      const queryResult = await this.delegate.findUnique({ where: { id } });
      if (queryResult) actionResult.push(queryResult);
    }

    return actionResult;
  }

  public async findManyByUserId(userId: number): Promise<Todo[]> {
    const queryResult = await this.delegate.findMany({ where: { userId } });
    return queryResult;
  }

  public async findManyByListId(listId: number): Promise<Todo[]> {
    const queryResult = await this.delegate.findMany({ where: { listId } });
    return queryResult;
  }

  public async update(id: number, data: IUpdateTodoData): Promise<Todo> {
    const queryResult = await this.delegate.update({ where: { id }, data });
    return queryResult;
  }

  public async updateMany(ids: number[], collection: IUpdateTodoData[]): Promise<Todo[]> {
    let index = 0;
    const queryResultCollection: Todo[] = [];

    while (index < ids.length) {
      const queryResult = await this.delegate.update({ where: { id: ids[index] }, data: collection[index] });
      queryResultCollection.push(queryResult);
      ++index;
    }
    return queryResultCollection;
  }

  public async delete(id: number) {
    await this.delegate.delete({ where: { id } });
  }

  public async deleteMany(ids: number[]): Promise<void> {
    let index = 0;
    while (index < ids.length) {
      await this.delegate.delete({ where: { id: ids[index] } });
      ++index;
    }
  }
}

export default TodoRepositroy;
