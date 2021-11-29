'use strict';

import { PrismaClient } from '.prisma/client';
import { IRepository, IRepositoryConstructor } from '../types/repositoryInterfaces';

class CollectionRepository implements IRepository {
  readonly context: PrismaClient;

  constructor({ context }: IRepositoryConstructor) {
    this.context = context;
  }
}

export default CollectionRepository;
