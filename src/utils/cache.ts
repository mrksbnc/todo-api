'use strict';

import logger from './logger';
import config from '../config';
import { ExpressRedisCache } from 'express-redis-cache';

/* eslint @typescript-eslint/no-var-requires: "off" */
export const cache: ExpressRedisCache = require('express-redis-cache')({
  host: config.cache.host,
  port: config.cache.port,
});

cache.on('connected', function () {
  logger.info('redis connection established successfully');
});

cache.on('disconnected', function () {
  logger.info('cache disconnected');
});

cache.on('error', (error: unknown) => {
  const e = error as Error;
  logger.error(e.message, error);
});
