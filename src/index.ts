'use strict';

import App from './app';
import validateEnv from './utils/validateEnv';

(() => {
  const server = new App({ routes: [] });
  validateEnv();
  server.initialize();
})();
