'use strict';

import services from '../../services';
import AuthController from './authController';
import UserController from './userController';

const controllers = [new AuthController(services.user, services.auth), new UserController(services.user)];

export default controllers;
