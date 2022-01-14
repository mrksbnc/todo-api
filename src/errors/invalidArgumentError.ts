'use strict';

import HttpError from './httpError';
import GeneralError from './generalError';
import ErrorNameEnum from '../data/enums/errorNameEnum';
import ErrorMessageEnum from '../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';

const InvalidArgumentError = new GeneralError({
  name: ErrorNameEnum.INVALID_ARGUMENT,
  message: ErrorMessageEnum.INVALID_ARGUMENT,
  httpError: new HttpError({
    status: HttpStatusCodeEnum.BAD_REQUEST,
    message: ErrorMessageEnum.INVALID_ARGUMENT,
  }),
});

export default InvalidArgumentError;
