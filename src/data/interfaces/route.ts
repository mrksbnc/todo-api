'use strict';

import { Router } from 'express';
import { IController } from './controller';

export interface IApiRoute<T = IController> {
  readonly path: string;
  readonly controller: T;
  readonly router: Router;
}

export type IApiRouteCollection = [IApiRoute];

export interface IApiRouteConstructor<T = IController> {
  readonly controller: T;
}
