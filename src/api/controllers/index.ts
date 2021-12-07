'use strict';

import services from '../../services';
import AuthController from './authController';
import UserController from './userController';

const controllers = [new AuthController(services.user), new UserController(services.user)];

export default controllers;
