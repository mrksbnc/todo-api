'use strict';

import { IApiRoute } from './routeInterfaces';

export interface IAppConstructor {
  routes: Readonly<IApiRoute[]>;
}
