'use strict';

import BaseException from '../exceptions/BaseException';
import HttpException from '../exceptions/httpException';
import ErrorMessageEnum from '../constants/errorMessageEnum';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';

const ResourceNotFoundError = new BaseException({
  name: 'ResourceNotFoundError',
  message: ErrorMessageEnum.RESOURCE_NOT_FOUND,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.NOT_FOUND,
    message: ErrorMessageEnum.RESOURCE_NOT_FOUND,
  }),
});

export default ResourceNotFoundError;
