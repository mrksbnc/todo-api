'use strict';

import UserService from './userService';
import ListService from './projectService';
import TodoService from './todoService';
import AuthService from './authService';
import repositories from '../repositories';

const services = Object.freeze({
  auth: new AuthService(),
  user: new UserService(repositories.user),
  todo: new TodoService(repositories.todo),
  project: new ListService(repositories.project),
});

export default services;
