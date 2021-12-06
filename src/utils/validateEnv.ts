'use strict';

import path from 'path';
import dotenv from 'dotenv';
import { cleanEnv, num, port, str } from 'envalid';

const validateEnv = () => {
  dotenv.config({ path: path.join(__dirname, '../../.env') });

  cleanEnv(process.env, {
    PORT: port(),
    APP_NAME: str(),
    NODE_ENV: str(),
    LOG_PERIOD: str(),
    MAX_LOG_FILE_COUNT: num(),
    SALT_ROUNDS: str(),
    SECRET: str(),
    DATABASE_URL: str(),
  });
};

export default validateEnv;
