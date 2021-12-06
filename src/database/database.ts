'use strict';

import fs from 'fs';
import path from 'path';
import logger from '../utils/logger';
import { Prisma, PrismaClient } from '.prisma/client';

class Database {
  private async connect(context: PrismaClient) {
    await context.$connect();
    logger.info('[loading...] database connection successfully established...');
  }
  private readSQLFile(file: string): string[] {
    logger.info('[loading...] loading SQL file content...');
    const sqls = fs
      .readFileSync(path.resolve(__dirname, file))
      .toString()
      .split('\n')
      .filter((line) => line.indexOf('--') !== 0)
      .join('\n')
      .replace(/(\r\n|\n|\r)/gm, ' ')
      .replace(/\s+/g, ' ')
      .split('\\.');
    return sqls;
  }
  private async executeSql(fileContent: string[]): Promise<void> {
    logger.info('[loading...] executing preload scripts...');
    for (const sql of fileContent) {
      try {
        await Prisma.raw(sql);
      } catch (error) {
        logger.error(error);
      }
    }
    logger.info('[loading...] preload scripts executed successfully...');
  }
  private async createTables(fileName: string): Promise<void> {
    await this.executeSql(this.readSQLFile(fileName));
    logger.info('[loading...] database tables are created or existed already...');
  }
  public async initializeDatabase(context: PrismaClient) {
    try {
      await this.connect(context);
      await this.createTables('createTables.sql');
      logger.info('[loading...] database init finished successfully');
    } catch (error) {
      logger.fatal('database init failed...');
      logger.error(error);
      process.exit(1);
    }
  }
}

export default Database;
