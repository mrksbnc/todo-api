'use strict';

import AuthRoute from './authRoute';
import controllers from '../controllers';

const routes = [new AuthRoute({ controller: controllers.auth })];

export default routes;
