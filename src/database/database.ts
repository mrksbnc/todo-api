'use strict';

import logger from '../utils/logger';
import { PrismaClient } from '@prisma/client';
import { IDelegateCollection } from '../data/interfaces/IDelegateCollection';
import { IDatabase, IDatabaseConstructor } from '../data/interfaces/IDatabase';

class Database implements IDatabase {
  readonly context: PrismaClient;
  readonly delegateCollection: IDelegateCollection;

  constructor({ context }: IDatabaseConstructor) {
    this.context = context;
    this.delegateCollection = Object.freeze({
      todo: this.context.todo,
      user: this.context.user,
      project: this.context.project,
    });
  }

  public async createConnection() {
    let isSuccessfulConnectionMade = true;
    try {
      await this.context.$connect();
      logger.info('connection with database established successfully!');
    } catch (error) {
      logger.error('connection with database failed!', error);
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

export default Database;
