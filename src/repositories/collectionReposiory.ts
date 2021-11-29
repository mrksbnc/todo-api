'use strict';

import {
  IRepository,
  CreateCollectionArgs,
  UpdateCollectionArgs,
  IRepositoryConstructor,
} from '../interfaces/repositoryInterfaces';
import { PrismaClient, Prisma, Collection } from '.prisma/client';

class CollectionRepository implements IRepository {
  readonly context: PrismaClient;
  private readonly table: Prisma.CollectionDelegate<false>;

  constructor({ context }: IRepositoryConstructor) {
    this.context = context;
    this.table = context.collection;
  }

  public async create(args: CreateCollectionArgs): Promise<void> {
    await this.table.create({ data: args });
  }

  public async findById(id: number): Promise<Collection | null> {
    const queryResult = await this.table.findUnique({ where: { id } });
    return queryResult;
  }

  public async findCollectionByCreatedBy(createdBy: number): Promise<Collection[]> {
    const queryResult = await this.table.findMany({ where: { createdBy } });
    return queryResult;
  }

  public async update({ id, data }: UpdateCollectionArgs): Promise<void> {
    await this.table.update({ where: { id }, data });
  }

  public async delete(id: number): Promise<void> {
    await this.table.delete({ where: { id } });
  }
}

export default CollectionRepository;
