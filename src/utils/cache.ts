'use strict';

import Redis from 'ioredis';
import logger from './logger';
import baseConfig from '../config/baseConfig';

const cache = new Redis({
  host: baseConfig.redis.host,
  port: baseConfig.redis.port,
});

cache.on('connect', () => {
  logger.info('redis connection established successfully!');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
cache.on('error', (error: any) => {
  const _e = error as Error;
  logger.error('[REDIS] ' + _e.message, error);
});

export default cache;
