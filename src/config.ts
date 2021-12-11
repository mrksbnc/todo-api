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
    base_url:
      process.env.NODE_ENV === 'production' ? String(process.env.BASE_URL_PROD) : String(process.env.BASE_URL_DEV),
    enabled_request_methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  auth: {
    salt_rounds: Number(process.env.SALT_ROUNDS),
    secret: String(process.env.SECRET),
    jwt_exp: String(process.env.JWT_EXP),
  },
  cache: {
    std_ttl: Number(process.env.STD_TDL),
    checkperiod: Number(process.env.CHECKPERIOD),
    delete_on_expire: Boolean(process.env.DELETE_ON_EXPIRE),
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
