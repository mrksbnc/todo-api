'use strict';

import { IRepository } from './repositoryInterfaces';

export interface IService<T = IRepository<unknown, unknown, unknown>> {
  readonly repository: T;
}

export interface IServiceConstructor<T = IRepository<unknown, unknown, unknown>> {
  repository: T;
}
