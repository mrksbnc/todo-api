'use strict';

import UserService from './userService';
import TodoService from './todoService';
import AuthService from './authService';
import repositories from '../repositories';
import ProjectService from './projectService';

const services = Object.freeze({
  auth: new AuthService(),
  user: new UserService(repositories.user),
  todo: new TodoService(repositories.todo),
  project: new ProjectService(repositories.project),
});

export default services;
