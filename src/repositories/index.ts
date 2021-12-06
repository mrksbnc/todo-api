'use strict';

import ListRepositroy from './listRepository';
import TodoRepositroy from './todoRepository';
import UserRepositroy from './userRepository';
import { listContext, todoContext, userContext } from '../context/contexts';

const repositories = Object.freeze({
  todo: new TodoRepositroy(todoContext),
  list: new ListRepositroy(listContext),
  user: new UserRepositroy(userContext),
});

export default repositories;
