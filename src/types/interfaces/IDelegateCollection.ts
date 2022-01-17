'use strict';

import { Prisma } from '@prisma/client';

export interface IDelegateCollection {
  todo: Prisma.TodoDelegate<false>;
  user: Prisma.UserDelegate<false>;
  project: Prisma.ProjectDelegate<false>;
}
