'use strict';

import HttpError from './httpError';
import GeneralError from './generalError';
import ErrorNameEnum from '../data/enums/errorNameEnum';
import ErrorMessageEnum from '../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';

const InvalidAuthTokenError = new GeneralError({
  name: ErrorNameEnum.INVALID_AUTH_TOKEN,
  message: ErrorMessageEnum.INVALID_AUTH_TOKEN,
  httpError: new HttpError({
    status: HttpStatusCodeEnum.BAD_REQUEST,
    message: ErrorMessageEnum.INVALID_AUTH_TOKEN,
  }),
});

export default InvalidAuthTokenError;
