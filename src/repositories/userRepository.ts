'use strict';

import { Prisma, User } from '.prisma/client';
import { ICreateUserData } from '../data/types/createTypes';
import { IUpdateUserData } from '../data/types/updateTypes';

class UserRepositroy {
  private readonly context: Prisma.UserDelegate<false>;

  constructor(context: Prisma.UserDelegate<false>) {
    this.context = context;
  }

  public async create(data: ICreateUserData): Promise<User> {
    const queryResult = await this.context.create({ data });
    return queryResult;
  }

  public async findById(id: number): Promise<User | null> {
    const queryResult = await this.context.findUnique({ where: { id } });
    return queryResult;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const queryResult = await this.context.findUnique({ where: { email } });
    return queryResult;
  }

  public async update(id: number, data: IUpdateUserData): Promise<User> {
    const queryResult = await this.context.update({ where: { id }, data });
    return queryResult;
  }

  public async delete(id: number): Promise<void> {
    await this.context.delete({ where: { id } });
  }
}

export default UserRepositroy;
