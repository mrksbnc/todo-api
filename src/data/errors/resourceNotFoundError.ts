'use strict';

import BaseException from '../exceptions/BaseException';
import HttpException from '../exceptions/httpException';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';
import ApiErrorMessageEnum from '../constants/apiErrorMessageEnum';

const ResourceNotFoundError = new BaseException({
  message: ApiErrorMessageEnum.RESOURCE_NOT_FOUND,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.NOT_FOUND,
    message: ApiErrorMessageEnum.RESOURCE_NOT_FOUND,
  }),
});

export default ResourceNotFoundError;
