'use strict';

import BaseException from '../exceptions/BaseException';
import HttpException from '../exceptions/httpException';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';
import ApiErrorMessageEnum from '../constants/apiErrorMessageEnum';

const ResourceAlreadyExistsError = new BaseException({
  message: ApiErrorMessageEnum.RESOURCE_ALREADY_EXISTS,
  httpException: new HttpException({
    status: HttpStatusCodeEnum.CONFLICT,
    message: ApiErrorMessageEnum.RESOURCE_ALREADY_EXISTS,
  }),
});

export default ResourceAlreadyExistsError;
