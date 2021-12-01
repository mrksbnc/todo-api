'use strict';

import path from 'path';
import dotenv from 'dotenv';
import { IConfig } from '../data/interfaces/configInterfaces';

dotenv.config({ path: './.env' });

const config: IConfig = Object.freeze({
  app: {
    name: process.env.APP_NAME || 'todo-api',
    env: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
  },
  server: {
    port: Number(process.env.PORT) || 3010,
  },
  log: {
    period: process.env.LOG_PERIOD || '1d',
    logDirPath: path.resolve(__dirname, '..', 'logs'),
    maxLogcount: Number(process.env.MAX_LOG_FILE_COUNT) || 3,
    infoLogPath: path.resolve(__dirname, '..', 'logs', 'info.log'),
    errorLogPath: path.resolve(__dirname, '..', 'logs', 'error.log'),
  },
  auth: {
    saltRounds: Number(process.env.SALT_ROUNDS) || 15,
    secretKey: process.env.SECRET_KEY || 'EdI=_lH|I@[5>;=kACz,S@$#@#_?><M<SDSAF_**/_DS',
  },
});

export default config;
