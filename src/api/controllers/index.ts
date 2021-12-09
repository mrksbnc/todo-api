'use strict';

import services from '../../services';
import AuthController from './authController';
import ListController from './listController';
import TodoController from './todoController';
import UserController from './userController';

const controllers = Object.freeze([
  new UserController(services.user),
  new ListController(services.list),
  new TodoController(services.todo),
  new AuthController(services.user, services.auth),
]);

export default controllers;
