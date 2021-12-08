'use strict';

import logger from '../../utils/logger';
import { PrismaClient } from '.prisma/client';

const baseDbContext = new PrismaClient({
  errorFormat: 'minimal',
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
  ],
});

baseDbContext.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();

  logger.info(`[QUERY] ${params.model}.${params.action} - ${after - before} ms`);
  return result;
});

export default baseDbContext;
