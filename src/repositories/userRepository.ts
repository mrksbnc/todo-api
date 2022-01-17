'use strict';

import { Prisma, User } from '.prisma/client';
import { CreateUserData } from '../types/createModels';
import { UpdateUserData } from '../types/updateModels';

class UserRepository {
  private readonly delegate: Prisma.UserDelegate<false>;

  constructor(delegate: Prisma.UserDelegate<false>) {
    this.delegate = delegate;
  }

  public async create(data: CreateUserData): Promise<User> {
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

  public async update(id: number, data: UpdateUserData): Promise<User> {
    const queryResult = await this.delegate.update({ where: { id }, data });
    return queryResult;
  }

  public async delete(id: number): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}

export default UserRepository;
