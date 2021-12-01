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
    SECRET_KEY: str(),
    LOG_PERIOD: str(),
    SALT_ROUNDS: num(),
    DATABASE_URL: str(),
    MAX_LOG_FILE_COUNT: num(),
  });
};

export default validateEnv;
