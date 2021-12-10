'use strict';

import logger from '../utils/logger';
import { PrismaClient } from '.prisma/client';

class Database {
  public async initializeDatabase(context: PrismaClient) {
    try {
      await context.$connect();

      logger.info('database connection established successfully');
    } catch (error) {
      logger.fatal('database connection failed', error);
      process.exit(1);
    }
  }
}

export default Database;
