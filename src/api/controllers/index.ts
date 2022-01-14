'use strict';

import services from '../../services';
import AuthController from './authController';
import TodoController from './todoController';
import UserController from './userController';
import HomeController from './homeController';
import ProjectController from './projectController';

const controllers = Object.freeze([
  new UserController(services.user),
  new TodoController(services.todo),
  new HomeController(services.user),
  new ProjectController(services.project),
  new AuthController(services.user, services.auth),
]);

export default controllers;
