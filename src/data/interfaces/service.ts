'use strict';

import { IRepository } from './repository';
import TodoService from '../../services/todoService';
import UserService from '../../services/userService';
import CollectionService from '../../services/collectionService';

export interface IService<T = IRepository<unknown, unknown, unknown>> {
  readonly repository: T;
}

export interface IServiceCollection {
  todo: TodoService;
  user: UserService;
  collection: CollectionService;
}

export interface IServiceConstructor<T = IRepository<unknown, unknown, unknown>> {
  repository: T;
}
