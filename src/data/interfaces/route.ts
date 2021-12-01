'use strict';

import { Router } from 'express';

export interface IApiRoute {
  path: string;
  router: Router;
}
