'use strict';

import TodoRepositroy from './todoRepository';
import UserRepositroy from './userRepository';
import ProjectRepositroy from './projectRepository';
import { projectContext, todoContext, userContext } from '../database/context/index';

const repositories = Object.freeze({
  todo: new TodoRepositroy(todoContext),
  user: new UserRepositroy(userContext),
  project: new ProjectRepositroy(projectContext),
});

export default repositories;
