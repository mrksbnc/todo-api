'use strict';

import logger from '../../utils/logger';
import { Prisma, PrismaClient } from '.prisma/client';

const baseContext = new PrismaClient({
  errorFormat: 'minimal',
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
  ],
});

baseContext.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();

  logger.info(`[QUERY] ${params.model}.${params.action} - ${after - before} ms`);
  return result;
});

baseContext.$on('error', (event) => {
  logger.error(event.message, event.target);
});

export default baseContext;
