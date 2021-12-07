'use strict';

import { PrismaClient } from '.prisma/client';
import logger from '../../utils/logger';

const baseDbContext = new PrismaClient({
  errorFormat: 'minimal',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
  ],
});

baseDbContext.$on('query', (e) => {
  logger.info(e.query + ' [duration]' + e.duration + 'ms');
});

export default baseDbContext;
