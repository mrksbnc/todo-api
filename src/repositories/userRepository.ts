'use strict';

import { PrismaClient } from '.prisma/client';
import { IRepository, IRepositoryConstructor } from '../interfaces/repositoryInterfaces';

class UserRepository implements IRepository {
  readonly context: PrismaClient;

  constructor({ context }: IRepositoryConstructor) {
    this.context = context;
  }
}

export default UserRepository;
