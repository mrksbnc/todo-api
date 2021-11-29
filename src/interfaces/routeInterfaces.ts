'use strict';

import { Router } from 'express';

export interface IRoute {
  path: string;
  router: Router;
}
