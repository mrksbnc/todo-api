'use strict';

import Server from './server';
import database from './database';
import validateEnv from './validators/validateEnv';

(async () => {
  validateEnv();
  await database.createConnection();
  new Server().listen();
})();
