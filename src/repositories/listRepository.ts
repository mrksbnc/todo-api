'use strict';

import { List, Prisma } from '.prisma/client';
import { ICreateListData, IUpdateListData } from '../data/types/repository';

class ListRepositroy {
  private readonly context: Prisma.ListDelegate<false>;

  constructor(context: Prisma.ListDelegate<false>) {
    this.context = context;
  }

  public async create(data: ICreateListData) {
    const queryResult = await this.context.create({ data });
    return queryResult;
  }

  public async findById(id: number): Promise<List | null> {
    const queryResult = await this.context.findUnique({ where: { id } });
    return queryResult;
  }

  public async findMany(ids: number[]): Promise<List[]> {
    const actionResult = [];

    for (const id of ids) {
      const queryResult = await this.context.findUnique({ where: { id } });
      if (queryResult) actionResult.push(queryResult);
    }

    return actionResult;
  }

  public async findManyByUserId(userId: number): Promise<List[]> {
    const queryResult = await this.context.findMany({ where: { userId } });
    return queryResult;
  }

  public async update(id: number, data: IUpdateListData): Promise<List> {
    const queryResult = await this.context.update({ where: { id }, data });
    return queryResult;
  }

  public async updateMany(ids: number[], collection: IUpdateListData[]): Promise<List[]> {
    let index = 0;
    const queryResultCollection: List[] = [];

    while (index < ids.length) {
      const queryResult = await this.context.update({ where: { id: ids[index] }, data: collection[index] });
      queryResultCollection.push(queryResult);
      ++index;
    }
    return queryResultCollection;
  }

  public async delete(id: number): Promise<void> {
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

export default ListRepositroy;
