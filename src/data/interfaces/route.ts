'use strict';

import { Router } from 'express';

export interface IApiRoute {
  readonly path: string;
  readonly router: Router;
}
