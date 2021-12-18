'use strict';

import BaseException from '../exceptions/baseException';
import HttpException from '../exceptions/httpException';
import ErrorMessageEnum from '../constants/errorMessageEnum';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';

const IncorrectUserDataError = new BaseException({
  name: 'IncorrectUserDataError',
  message: ErrorMessageEnum.INCORRECT_USER_DATA,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.BAD_REQUEST,
    message: ErrorMessageEnum.INCORRECT_USER_DATA,
  }),
});

export default IncorrectUserDataError;
