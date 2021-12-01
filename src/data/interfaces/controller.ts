'use strict';

import { IService } from './service';

export interface IController {
  readonly service: IService;
}

export interface IControllerConstructor<T = IService> {
  service: T;
}
