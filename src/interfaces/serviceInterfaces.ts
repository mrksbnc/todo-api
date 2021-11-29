'use strict';

import TodoRepository from '../repositories/todoRepository';
import UserRepository from '../repositories/userRepository';
import CollectionRepository from '../repositories/collectionReposiory';

type Services = UserRepository | TodoRepository | CollectionRepository;

export interface IService<T = keyof Services> {
  readonly repository: T;
}

export interface IServiceConstructor<T = UserRepository | TodoRepository | CollectionRepository> {
  repository: T;
}
