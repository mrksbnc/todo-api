'use strict';

import App from './app';

(() => {
  const server = new App({ routes: [] });
  server.initialize();
})();
