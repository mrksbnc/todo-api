'use strict';

import context from '../prisma/context';
import UserRepository from './userRepository';
import TodoRepository from './todoRepository';
import CollectionRepository from './collectionReposiory';
import { IRepositoryCollection } from '../interfaces/repositoryInterfaces';

const repositories: IRepositoryCollection = Object.freeze({
  user: new UserRepository({ context }),
  todo: new TodoRepository({ context }),
  collection: new CollectionRepository({ context }),
});

export default repositories;
