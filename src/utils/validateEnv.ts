'use strict';

import path from 'path';
import dotenv from 'dotenv';
import { bool, cleanEnv, num, port, str } from 'envalid';

const validateEnv = () => {
  dotenv.config({ path: path.join(__dirname, '../../.env') });

  cleanEnv(process.env, {
    PORT: port(),
    APP_NAME: str(),
    NODE_ENV: str(),
    LOG_PERIOD: str(),
    BASE_URL_DEV: str(),
    BASE_URL_PROD: str(),
    DELETE_ON_EXPIRE: bool(),
    CHECKPERIOD: num(),
    STD_TDL: num(),
    MAX_LOG_FILE_COUNT: num(),
    SALT_ROUNDS: str(),
    SECRET: str(),
    DATABASE_URL: str(),
  });
};

export default validateEnv;
