'use strict';

import UserService from './userService';
import ListService from './listService';
import TodoService from './todoService';
import repositories from '../repositories';

const services = Object.freeze({
  user: new UserService(repositories.user),
  todo: new TodoService(repositories.todo),
  list: new ListService(repositories.list),
});

export default services;
