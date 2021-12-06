'use strict';

import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

const config = Object.freeze({
  node_env: String(process.env.NODE_ENV),
  app_name: String(process.env.APP_NAME),
  isProd: process.env.NODE_ENV === 'production',
  server: {
    port: Number(process.env.PORT),
  },
  auth: {
    salt_rounds: Number(process.env.SALT_ROUNDS),
    secret: String(process.env.SECRET),
  },
  log: {
    log_period: String(process.env.LOG_PERIOD),
    log_dir_path: path.resolve('src', 'logs'),
    info_log_path: path.resolve('src', 'logs', 'info.log'),
    error_log_path: path.resolve('src', 'logs', 'error.log'),
    max_log_file_count: Number(process.env.MAX_LOG_FILE_COUNT),
  },
});

export default config;
