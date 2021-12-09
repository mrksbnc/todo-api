'use strict';

import BaseException from '../exceptions/baseException';
import HttpException from '../exceptions/httpException';
import ErrorMessageEnum from '../constants/errorMessageEnum';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';

const InvalidNumericIdError = new BaseException({
  name: 'InvalidNumericIdError',
  message: ErrorMessageEnum.INVALID_NUMERIC_ID,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.BAD_REQUEST,
    message: ErrorMessageEnum.INVALID_NUMERIC_ID,
  }),
});

export default InvalidNumericIdError;
