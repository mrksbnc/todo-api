'use strict';

import { IApiRoute } from './route';

export interface IAppConstructor {
  routes: Readonly<IApiRoute[]>;
}
