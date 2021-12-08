'use strict';

import BaseException from '../exceptions/BaseException';
import HttpException from '../exceptions/httpException';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';
import ErrorMessageEnum from '../constants/errorMessageEnum';

const ResourceNotFoundError = new BaseException({
  message: ErrorMessageEnum.RESOURCE_NOT_FOUND,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.NOT_FOUND,
    message: ErrorMessageEnum.RESOURCE_NOT_FOUND,
  }),
});

export default ResourceNotFoundError;
