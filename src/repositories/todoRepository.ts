'use strict';

import {
  IRepository,
  UpdateTodoArgs,
  CreateTodoArgs,
  IRepositoryConstructor,
} from '../interfaces/repositoryInterfaces';
import { Prisma, PrismaClient, Todo } from '.prisma/client';

class TodoRepository implements IRepository {
  readonly context: PrismaClient;
  private readonly table: Prisma.TodoDelegate<false>;

  constructor({ context }: IRepositoryConstructor) {
    this.context = context;
    this.table = context.todo;
  }

  public async create(args: CreateTodoArgs): Promise<void> {
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

  public async update({ id, data }: UpdateTodoArgs): Promise<void> {
    await this.table.update({ where: { id }, data });
  }

  public async delete(id: number) {
    await this.table.delete({ where: { id } });
  }
}

export default TodoRepository;
