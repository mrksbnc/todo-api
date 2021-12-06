'use strict';

import { Prisma, Todo } from '.prisma/client';

class TodoRepositroy {
  private readonly context: Prisma.TodoDelegate<false>;

  constructor(context: Prisma.TodoDelegate<false>) {
    this.context = context;
  }

  public async create(data: ICreateTodoData): Promise<void> {
    await this.context.create({ data });
  }

  public async createMany(data: ICreateTodoData[]) {
    await this.context.createMany({ data });
  }

  public async findById(id: number): Promise<Todo | null> {
    const queryResult = await this.context.findUnique({ where: { id } });
    return queryResult;
  }

  public async findManyByUserId(userId: number): Promise<Todo[]> {
    const queryResult = await this.context.findMany({ where: { userId } });
    return queryResult;
  }

  public async findManyByListId(listId: number): Promise<Todo[]> {
    const queryResult = await this.context.findMany({ where: { listId } });
    return queryResult;
  }

  public async update(id: number, data: IUpdateTodoData) {
    await this.context.update({ where: { id }, data });
  }

  public async updateMany(ids: number[], args: IUpdateTodoData[]) {
    ids.forEach(async (id, index) => {
      await this.context.update({ where: { id }, data: args[index] });
    });
  }

  public async delete(id: number) {
    await this.context.delete({ where: { id } });
  }

  public async deleteMany(ids: number[]): Promise<void> {
    ids.forEach(async (id) => {
      await this.context.delete({ where: { id } });
    });
  }
}

export default TodoRepositroy;
