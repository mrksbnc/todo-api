'use strict';

import dotenv from 'dotenv';
import { IAppConfig } from '../types/configInterfaces';

dotenv.config({ path: './.env' });

const config: IAppConfig = {
  app: {
    name: process.env.APP_NAME || 'todo_api',
    env: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
  },
  server: {
    port: Number(process.env.PORT) || 3010,
  },
};

export default config;
