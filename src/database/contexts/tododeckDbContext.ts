'use strict';

import logger from '../../utils/logger';
import { PrismaClient } from '@prisma/client';

const tododeckDbContext = new PrismaClient({
  errorFormat: 'minimal',
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
  ],
});

tododeckDbContext.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();

  logger.info(`[QUERY] ${params.model}.${params.action} - ${after - before} ms`);
  return result;
});

tododeckDbContext.$on('error', (event) => {
  logger.error(event.message, event.target);
});

export default tododeckDbContext;
