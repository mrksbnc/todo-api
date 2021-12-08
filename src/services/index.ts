'use strict';

import UserService from './userService';
import ListService from './listService';
import TodoService from './todoService';
import AuthService from './authService';
import repositories from '../repositories';

const services = Object.freeze({
  auth: new AuthService(repositories.user),
  user: new UserService(repositories.user),
  todo: new TodoService(repositories.todo),
  list: new ListService(repositories.list),
});

export default services;
