'use strict';

import services from '../../services';
import AuthController from './authController';
import UserController from './userController';

const controllers = [new UserController(services.user), new AuthController(services.user, services.auth)];

export default controllers;
