'use strict';

import BaseException from '../exceptions/BaseException';
import HttpException from '../exceptions/httpException';
import ErrorMessageEnum from '../constants/errorMessageEnum';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';

const InvalidArgumentError = new BaseException({
  message: ErrorMessageEnum.INVALID_ARGUMENT,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.BAD_REQUEST,
    message: ErrorMessageEnum.INVALID_ARGUMENT,
  }),
});

export default InvalidArgumentError;
