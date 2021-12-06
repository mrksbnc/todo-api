'use strict';

import Server from './server';
import Database from './database/database';
import validateEnv from './utils/validateEnv';
import baseDbContext from './database/context/baseDbContext';

(async () => {
  validateEnv();
  await new Database().initializeDatabase(baseDbContext);
  new Server().listen();
})();
