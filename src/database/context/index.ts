'use strict';

import { Prisma } from '.prisma/client';
import baseContext from './baseContext';

export const userContext: Prisma.UserDelegate<false> = baseContext.user;
export const todoContext: Prisma.TodoDelegate<false> = baseContext.todo;
export const projectContext: Prisma.ProjectDelegate<false> = baseContext.project;
