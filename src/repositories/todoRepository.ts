'use strict';

import { IRepository, IUpdateTodoArgs, ICreateTodoArgs, IRepositoryConstructor } from '../data/interfaces/repository';
import { Prisma, PrismaClient, Todo } from '.prisma/client';

class TodoRepository implements IRepository<ICreateTodoArgs, Todo, IUpdateTodoArgs> {
  private readonly context: PrismaClient;
  private readonly table: Prisma.TodoDelegate<false>;

  constructor({ context }: IRepositoryConstructor) {
    this.context = context;
    this.table = this.context.todo;
  }

  public async create(args: ICreateTodoArgs): Promise<void> {
    await this.table.create({ data: args });
  }

  public async findById(id: number): Promise<Todo | null> {
    const queryResult = await this.table.findUnique({ where: { id } });
    return queryResult;
  }

  public async findManyByCollectionId(collectionId: number): Promise<Todo[]> {
    const queryResult = await this.table.findMany({ where: { collectionId } });
    return queryResult;
  }

  public async findManyByCreatedById(createdBy: number): Promise<Todo[]> {
    const queryResult = await this.table.findMany({ where: { createdBy } });
    return queryResult;
  }

  public async update({ id, data }: { id: number; data: IUpdateTodoArgs }): Promise<void> {
    await this.table.update({ where: { id }, data });
  }

  public async delete(id: number) {
    await this.table.delete({ where: { id } });
  }
}

export default TodoRepository;
