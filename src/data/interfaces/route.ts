'use strict';

import { Router } from 'express';
import { IController } from './controller';
import { IService } from './service';

export interface IApiRoute {
  readonly path: string;
  readonly router: Router;
}
