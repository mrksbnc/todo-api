'use strict';

import BaseException from '../exceptions/BaseException';
import HttpException from '../exceptions/httpException';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';
import ErrorMessageEnum from '../constants/errorMessageEnum';

const InvalidNumericIdError = new BaseException({
  message: ErrorMessageEnum.INVALID_NUMERIC_ID,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.BAD_REQUEST,
    message: ErrorMessageEnum.INVALID_NUMERIC_ID,
  }),
});

export default InvalidNumericIdError;
