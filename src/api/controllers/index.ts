'use strict';

import services from '../../services';
import { cache } from '../../utils/cache';
import AuthController from './authController';
import ListController from './listController';
import TodoController from './todoController';
import UserController from './userController';

const controllers = Object.freeze([
  new UserController(services.user, cache),
  new ListController(services.list, cache),
  new TodoController(services.todo, cache),
  new AuthController(services.user, services.auth),
]);

export default controllers;
