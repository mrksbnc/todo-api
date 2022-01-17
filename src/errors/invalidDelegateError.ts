'use strict';

import HttpError from './httpError';
import GeneralError from './generalError';
import ErrorNameEnum from '../data/enums/errorNameEnum';
import ErrorMessageEnum from '../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';

const InvalidDelegateError = new GeneralError({
  name: ErrorNameEnum.INVALID_DELEGATE,
  message: ErrorMessageEnum.INVALID_DELEGATE,
  httpError: new HttpError({
    status: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
    message: ErrorMessageEnum.INTERNAL_SERVVER_ERROR,
  }),
});

export default InvalidDelegateError;
