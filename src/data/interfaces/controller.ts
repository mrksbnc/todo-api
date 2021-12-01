'use strict';

import { IService } from './service';
import AuthController from '../../api/controllers/authController';

export interface IController<T = IService> {
  readonly service: T;
}

export interface IControllerCollection {
  auth: AuthController;
}

export interface IControllerConstructor<T = IService> {
  service: T;
}
