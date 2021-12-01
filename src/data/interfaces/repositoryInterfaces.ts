'use strict';

import { PrismaClient } from '.prisma/client';
import TodoRepository from '../../repositories/todoRepository';
import UserRepository from '../../repositories/userRepository';
import CollectionRepository from '../../repositories/collectionReposiory';

export interface IRepository<C, R, U> {
  create: (args: C) => Promise<void>;
  findById: (id: number) => Promise<R | null>;
  update: ({ id, data }: { id: number; data: U }) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export interface IRepositoryConstructor {
  context: PrismaClient;
}

export interface IRepositoryCollection {
  user: UserRepository;
  todo: TodoRepository;
  collection: CollectionRepository;
}

export interface ICreateUserArgs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  disabledBy?: number;
  disabledAt?: Date;
}

export interface IUpdateUserArgs {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  disabledBy?: number;
  disabledAt?: Date;
}

export interface ICreateTodoArgs {
  todoName: string;
  todoDescription: string;
  createdBy: number;
  dueDate?: Date;
  collectionId: number | null;
}

export interface IUpdateTodoArgs {
  todoName?: string;
  todoDescription?: string;
  createdBy?: number;
  dueDate?: Date;
  collectionId?: number;
}

export interface ICreateCollectionArgs {
  collectionName: string;
  description: string;
  createdBy: number;
}

export interface IUpdateCollectionArgs {
  collectionName?: string;
  description?: string;
  createdBy?: number;
}
