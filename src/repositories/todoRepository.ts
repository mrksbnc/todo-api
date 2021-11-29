'use strict';

import { PrismaClient } from '.prisma/client';
import { IRepository, IRepositoryConstructor } from '../interfaces/repositoryInterfaces';

class TodoRepository implements IRepository {
  readonly context: PrismaClient;

  constructor({ context }: IRepositoryConstructor) {
    this.context = context;
  }
}

export default TodoRepository;
