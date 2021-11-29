'use strict';

import { PrismaClient } from '.prisma/client';
import TodoRepository from '../repositories/todoRepository';
import UserRepository from '../repositories/userRepository';
import CollectionRepository from '../repositories/collectionReposiory';

export interface IRepository {
  readonly context: PrismaClient;
}

export interface IRepositoryConstructor {
  context: PrismaClient;
}

export interface IRepositoryCollection {
  user: UserRepository;
  todo: TodoRepository;
  collection: CollectionRepository;
}
