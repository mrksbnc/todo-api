'use strict';

import path from 'path';
import dotenv from 'dotenv';
import { IConfig } from '../interfaces/configInterfaces';

dotenv.config({ path: './.env' });

const config: IConfig = {
  app: {
    name: process.env.APP_NAME || 'todo-api',
    env: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
  },
  server: {
    port: Number(process.env.PORT) || 3010,
  },
  log: {
    period: '1d',
    maxLogcount: 3,
    infoLogPath: path.resolve(__dirname, '..', 'logs', 'info.log'),
    errorLogPath: path.resolve(__dirname, '..', 'logs', 'error.log'),
  },
};

export default config;
