'use strict';

import { Prisma } from '.prisma/client';
import baseDbContext from './baseDbContext';

export const userContext: Prisma.UserDelegate<false> = baseDbContext.user;
export const todoContext: Prisma.TodoDelegate<false> = baseDbContext.todo;
export const listContext: Prisma.ListDelegate<false> = baseDbContext.list;
