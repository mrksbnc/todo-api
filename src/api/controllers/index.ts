'use strict';

import services from '../../services';
import UserController from './userController';

const controllers = [new UserController(services.user)];

export default controllers;
