'use strict';

import { List, Prisma } from '.prisma/client';

class ListRepositroy {
  private readonly context: Prisma.ListDelegate<false>;

  constructor(context: Prisma.ListDelegate<false>) {
    this.context = context;
  }

  public async create(data: ICreateListData) {
    await this.context.create({ data });
  }

  public async findById(id: number): Promise<List | null> {
    const queryResult = await this.context.findUnique({ where: { id } });
    return queryResult;
  }

  public async findManyByUserId(userId: number): Promise<List[]> {
    const queryResult = await this.context.findMany({ where: { userId } });
    return queryResult;
  }

  public async update(id: number, data: IUpdateListData) {
    await this.context.update({ where: { id }, data });
  }

  public async updateMany(ids: number[], args: IUpdateListData[]) {
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

export default ListRepositroy;
