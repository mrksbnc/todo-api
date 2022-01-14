'use strict';

import { PrismaClient } from '@prisma/client';

export interface IRepository {
  readonly context: PrismaClient;
}

export interface IRepositoryConstructor {
  context: PrismaClient;
}

export interface IRepositoryCollection {
  [key: string]: IRepository;
}
