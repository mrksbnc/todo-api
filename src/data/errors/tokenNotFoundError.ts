'use strict';

import BaseException from '../exceptions/BaseException';
import HttpException from '../exceptions/httpException';
import ErrorMessageEnum from '../constants/errorMessageEnum';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';

const TokenNotFoundError = new BaseException({
  message: ErrorMessageEnum.MISSING_AUTH_TOKEN,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.UNAUTHORIZED,
    message: ErrorMessageEnum.MISSING_AUTH_TOKEN,
  }),
});

export default TokenNotFoundError;
