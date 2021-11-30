'use strict';

import { IRepository } from './repositoryInterfaces';

export interface IService<T = IRepository> {
  readonly repository: T;
}

export interface IServiceConstructor<T = IRepository> {
  repository: T;
}
