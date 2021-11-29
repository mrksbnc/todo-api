'use strict';

import {
  IRepository,
  CreateUserArgs,
  UpdateUserArgs,
  IRepositoryConstructor,
} from '../interfaces/repositoryInterfaces';
import { Prisma, PrismaClient, User } from '.prisma/client';

class UserRepository implements IRepository {
  readonly context: PrismaClient;
  private readonly table: Prisma.UserDelegate<false>;

  constructor({ context }: IRepositoryConstructor) {
    this.context = context;
    this.table = context.user;
  }

  public async create(args: CreateUserArgs): Promise<void> {
    await this.table.create({ data: args });
  }

  public async findById(id: number): Promise<User | null> {
    const queryResult = await this.table.findUnique({ where: { id } });
    return queryResult;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const queryResult = await this.table.findUnique({ where: { email } });
    return queryResult;
  }

  public async update({ id, data }: UpdateUserArgs): Promise<void> {
    await this.table.update({ where: { id }, data });
  }

  public async delete(id: number): Promise<void> {
    await this.table.delete({ where: { id } });
  }
}

export default UserRepository;
