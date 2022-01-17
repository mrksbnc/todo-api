'use strict';

import database from '../database';
import TodoRepository from './todoRepository';
import UserRepository from './userRepository';
import ProjectRepository from './projectRepository';
import IRepositoryCollection from '../types/interfaces/IRepositoryCollection';

const repositories: IRepositoryCollection = Object.freeze({
  todo: new TodoRepository(database.delegateCollection.todo),
  user: new UserRepository(database.delegateCollection.user),
  project: new ProjectRepository(database.delegateCollection.project),
});

export default repositories;
