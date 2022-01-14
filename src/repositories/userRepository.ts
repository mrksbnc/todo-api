'use strict';

import { Prisma, User } from '.prisma/client';
import { ICreateUserData } from '../data/types/createTypes';
import { IUpdateUserData } from '../data/types/updateTypes';

class UserRepositroy {
  private readonly delegate: Prisma.UserDelegate<false>;

  constructor(delegate: Prisma.UserDelegate<false>) {
    this.delegate = delegate;
  }

  public async create(data: ICreateUserData): Promise<User> {
    const queryResult = await this.delegate.create({ data });
    return queryResult;
  }

  public async findById(id: number): Promise<User | null> {
    const queryResult = await this.delegate.findUnique({ where: { id } });
    return queryResult;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const queryResult = await this.delegate.findUnique({ where: { email } });
    return queryResult;
  }

  public async update(id: number, data: IUpdateUserData): Promise<User> {
    const queryResult = await this.delegate.update({ where: { id }, data });
    return queryResult;
  }

  public async delete(id: number): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}

export default UserRepositroy;
