'use strict';

import BaseException from '../exceptions/BaseException';
import HttpException from '../exceptions/httpException';
import ErrorMessageEnum from '../constants/errorMessageEnum';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';

const UnauthorizedError = new BaseException({
  message: ErrorMessageEnum.UNAUTHORIZED,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.UNAUTHORIZED,
    message: ErrorMessageEnum.UNAUTHORIZED,
  }),
});

export default UnauthorizedError;
