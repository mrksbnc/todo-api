'use strict';

import services from '../../services';
import AuthController from './authController';
import { IControllerCollection } from '../../data/interfaces/controller';

const controllers: IControllerCollection = Object.freeze({
  auth: new AuthController({ service: services.user }),
});

export default controllers;
