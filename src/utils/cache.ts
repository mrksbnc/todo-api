'use strict';

import Redis from 'ioredis';
import logger from './logger';
import baseConfig from '../config/baseConfig';

class RedisClient {
  private client: Redis.Redis;

  constructor() {
    this.client = this.createNewRedisClient();
    this.registerEventListeners();
  }

  private createNewRedisClient(): Redis.Redis {
    return new Redis({
      host: baseConfig.redis.host,
      port: baseConfig.redis.port,
      maxRetriesPerRequest: 10,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });
  }

  private registerEventListeners() {
    this.client.on('connect', () => {
      logger.info('redis connection established successfully!');
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.client.on('error', (error: any) => {
      const _e = error as Error;
      logger.error('[REDIS] ' + _e.message, error);
    });
  }

  public async exists(key: string): Promise<boolean> {
    const isExists = await this.client.exists(key);
    return Boolean(isExists);
  }

  public async get<T>(key: string): Promise<T | null> {
    const cachedValue: string | null = await this.client.get(key);
    if (cachedValue) {
      try {
        const parsed: T = JSON.parse(cachedValue);
        return parsed;
      } catch (error) {
        const _e = error as Error;
        logger.error(_e.message, error);
        return null;
      }
    } else {
      return null;
    }
  }

  public async getMany<T>(keys: string[]): Promise<T[]> {
    let index = 0;
    const parsedResult: T[] = [];
    const cachedValues: (string | null)[] = await this.client.mget(keys);

    while (index < cachedValues.length) {
      const iterated = cachedValues[index];
      if (iterated) {
        try {
          const parsedValue = JSON.parse(iterated);
          parsedResult.push(parsedValue);
        } catch (error) {
          const _e = error as Error;
          logger.error(_e.message, error);
        }
      }
      ++index;
    }
    return parsedResult;
  }

  public async set<T>(key: string, value: T, exp?: number): Promise<void> {
    const stringifiedValue = JSON.stringify(value);
    const expireTime = exp ? Number(exp) : 1800;
    await this.client.set(key, stringifiedValue, 'ex', expireTime);
  }

  public async delete(key: string): Promise<boolean> {
    const deleteResult = await this.client.del(key);
    return Boolean(deleteResult);
  }
}

const cache = new RedisClient();
export default cache;
