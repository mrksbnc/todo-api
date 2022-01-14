'use strict';

import database from '../database';
import TodoRepositroy from './todoRepository';
import UserRepositroy from './userRepository';
import ProjectRepository from './projectRepository';

const repositories = Object.freeze({
  todo: new TodoRepositroy(database.delegateCollection.todo),
  user: new UserRepositroy(database.delegateCollection.user),
  project: new ProjectRepository(database.delegateCollection.project),
});

export default repositories;
