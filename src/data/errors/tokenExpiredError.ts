'use strict';

import BaseException from '../exceptions/BaseException';
import HttpException from '../exceptions/httpException';
import ErrorMessageEnum from '../constants/errorMessageEnum';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';

const TokenExpiredError = new BaseException({
  message: ErrorMessageEnum.TOKEN_EXPIRED,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.UNAUTHORIZED,
    message: ErrorMessageEnum.TOKEN_EXPIRED,
  }),
});

export default TokenExpiredError;
