'use strict';

import BaseException from '../exceptions/BaseException';
import HttpException from '../exceptions/httpException';
import ErrorMessageEnum from '../constants/errorMessageEnum';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';

const ResourceAlreadyExistsError = new BaseException({
  message: ErrorMessageEnum.RESOURCE_ALREADY_EXISTS,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.CONFLICT,
    message: ErrorMessageEnum.RESOURCE_ALREADY_EXISTS,
  }),
});

export default ResourceAlreadyExistsError;
