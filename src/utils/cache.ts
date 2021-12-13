'use strict';

import logger from './logger';
import config from '../config';
import NodeCache, { Key, ValueSetItem } from 'node-cache';

class Cache {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({
      stdTTL: config.cache.std_ttl,
      checkperiod: config.cache.checkperiod,
      deleteOnExpire: config.cache.delete_on_expire,
    });

    logger.info('cache initialized successfully');

    this.cache.on('set', (key: Key, value: unknown) => {
      logger.info(`[CACHE] new value added to cache key: ${key}, value: ${JSON.stringify(value)}`);
    });

    this.cache.on('expired', (key: Key) => {
      logger.info(`[CACHE] ${key} expired, data going to be deleted from memory`);
    });
  }

  public get<T>(key: Key): T | undefined {
    return this.cache.get(key);
  }

  public mget<T>(keys: Key[]): { [key: string]: T | undefined } {
    return this.cache.mget(keys);
  }

  public take(key: Key): void {
    return this.cache.take(key);
  }

  public set<T>(key: Key, value: T): boolean {
    return this.cache.set(key, value);
  }

  public mSet(data: ValueSetItem[]) {
    return this.cache.mset(data);
  }

  public del(key: Key): number {
    return this.cache.del(key);
  }

  public mDel(keys: Key[]): number {
    return this.cache.del(keys);
  }

  public getTtl(key: Key): number | undefined {
    return this.cache.getTtl(key);
  }

  public changeTtl(key: Key, ttl: number): boolean {
    return this.cache.ttl(key, ttl);
  }

  public listKeys(): string[] {
    return this.cache.keys();
  }

  public has(key: Key): boolean {
    return this.cache.has(key);
  }

  public getStats(): NodeCache.Stats {
    return this.cache.getStats();
  }

  public flush(): void {
    return this.cache.flushAll();
  }

  public flushStats(): void {
    return this.cache.flushStats();
  }

  public close() {
    this.cache.close();
  }

  public createKey(...args: Key[]): string {
    return args.join('.');
  }
}

export default new Cache();
