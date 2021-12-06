'use strict';

import { PrismaClient } from '.prisma/client';

const baseDbContext = new PrismaClient({
  errorFormat: 'minimal',
});

export default baseDbContext;
