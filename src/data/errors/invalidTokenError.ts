'use strict';

import BaseException from '../exceptions/BaseException';
import HttpException from '../exceptions/httpException';
import ErrorMessageEnum from '../constants/errorMessageEnum';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';

const InvalidTokenError = new BaseException({
  name: 'InvalidTokenError',
  message: ErrorMessageEnum.INVALID_AUTH_TOKEN,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.UNAUTHORIZED,
    message: ErrorMessageEnum.INVALID_AUTH_TOKEN,
  }),
});

export default InvalidTokenError;
