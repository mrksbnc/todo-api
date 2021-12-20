'use strict';

import UserService from './userService';
import TodoService from './todoService';
import AuthService from './authService';
import HomeService from './homeService';
import ListService from './projectService';
import repositories from '../repositories';

const services = Object.freeze({
  auth: new AuthService(),
  user: new UserService(repositories.user),
  todo: new TodoService(repositories.todo),
  project: new ListService(repositories.project),
  home: new HomeService({ userRepository: repositories.user, userService: new UserService(repositories.user) }),
});

export default services;
