'use strict';

import { PrismaClient } from '@prisma/client';
import { IDatabase, IDatabaseConstructor } from '../data/interfaces/IDatabase';
import logger from '../utils/logger';

class Database implements IDatabase {
  readonly context: PrismaClient;

  constructor({ context }: IDatabaseConstructor) {
    this.context = context;
  }

  public async createConnection() {
    let isSuccessfulConnectionMade = true;
    try {
      await this.context.$connect();
      logger.info('connection with ORDO context established successfully!');
    } catch (error) {
      logger.error('connection with ORDO context failed!', error);
      isSuccessfulConnectionMade = false;
    }

    if (!isSuccessfulConnectionMade) {
      logger.fatal(
        'connection with required database contexts could not be established! process will exit with non 0 exit code',
      );
      process.exit(-1);
    }
  }
}

export default Database