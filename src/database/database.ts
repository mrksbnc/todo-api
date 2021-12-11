'use strict';

import logger from '../utils/logger';
import { PrismaClient } from '.prisma/client';

class Database {
  private async connect(context: PrismaClient) {
    await context.$connect();
  }

  public async initializeDatabase(context: PrismaClient) {
    try {
      await this.connect(context);
      logger.info('database connection established successfully');
    } catch (error) {
      logger.fatal('database connection failed! process will exit now', error);
      process.exit(1);
    }
  }
}

export default Database;
