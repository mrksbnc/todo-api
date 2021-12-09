'use strict';

import services from '../../services';
import AuthController from './authController';
import ListController from './listController';
import UserController from './userController';

const controllers = [
  new UserController(services.user),
  new ListController(services.list),
  new AuthController(services.user, services.auth),
];

export default controllers;
