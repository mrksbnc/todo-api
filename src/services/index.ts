'use strict';

import UserService from './userService';
import ListService from './listService';
import TodoService from './todoService';
import repositories from '../repositories';
import AuthService from './authService';

const services = Object.freeze({
  auth: new AuthService(repositories.user),
  user: new UserService(repositories.user),
  todo: new TodoService(repositories.todo),
  list: new ListService(repositories.list),
});

export default services;
