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

export interface CreateUserArgs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  disabledBy?: number;
  disabledAt?: Date;
}

export interface UpdateUserArgs {
  id: number;
  data: {
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    disabledBy?: number;
    disabledAt?: Date;
  };
}

export interface CreateTodoArgs {
  todoName: string;
  todoDescription: string;
  createdBy: number;
  dueDate?: Date;
  collectionId: number | null;
}

export interface UpdateTodoArgs {
  id: number;
  data: {
    todoName?: string;
    todoDescription?: string;
    createdBy?: number;
    dueDate?: Date;
    collectionId?: number;
  };
}

export interface CreateCollectionArgs {
  collectionName: string;
  description: string;
  createdBy: number;
}

export interface UpdateCollectionArgs {
  id: number;
  data: {
    collectionName?: string;
    description?: string;
    createdBy?: number;
  };
}
