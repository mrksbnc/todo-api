'use strict';

import ListRepositroy from '../repositories/listRepository';
import TodoRepositroy from '../repositories/todoRepository';
import UserRepositroy from '../repositories/userRepository';
import { listContext, todoContext, userContext } from '../database/context/contexts';

const services = Object.freeze({
  user: new UserRepositroy(userContext),
  todo: new TodoRepositroy(todoContext),
  list: new ListRepositroy(listContext),
});

export default services;
