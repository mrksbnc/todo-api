'use strict';

import Server from './server';
import Database from './database/database';
import validateEnv from './utils/validateEnv';
import baseContext from './database/context/baseContext';

(async () => {
  validateEnv();
  await new Database().initializeDatabase(baseContext);
  new Server().listen();
})();
