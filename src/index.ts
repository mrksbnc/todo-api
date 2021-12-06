'use strict';

import Server from './server';
import validateEnv from './utils/validateEnv';

const todoApiServer = new Server();

validateEnv();
todoApiServer.listen();
