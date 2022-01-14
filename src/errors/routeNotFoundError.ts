'use strict';

import HttpError from './httpError';
import GeneralError from './generalError';
import ErrorNameEnum from '../data/enums/errorNameEnum';
import ErrorMessageEnum from '../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';

const RouteNotFoundError = new GeneralError({
  name: ErrorNameEnum.ROUTE_NOT_FOUND,
  message: ErrorMessageEnum.ROUTE_NOT_FOUND,
  httpError: new HttpError({
    status: HttpStatusCodeEnum.NOT_FOUND,
    message: ErrorMessageEnum.ROUTE_NOT_FOUND,
  }),
});

export default RouteNotFoundError;
