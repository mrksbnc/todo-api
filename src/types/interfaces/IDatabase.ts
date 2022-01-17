'use strict';

import { Prisma, PrismaClient } from '@prisma/client';

export interface IDatabase {
  readonly context: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  createConnection: () => Promise<void>;
}

export interface IDatabaseConstructor {
  readonly context: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}
