'use strict';

import HttpError from './httpError';
import GeneralError from './generalError';
import ErrorNameEnum from '../data/enums/errorNameEnum';
import ErrorMessageEnum from '../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';

const ResourceNotFoundError = new GeneralError({
  name: ErrorNameEnum.RESOURCE_NOT_FOUND,
  message: ErrorMessageEnum.RESOURCE_NOT_FOUND,
  httpError: new HttpError({
    status: HttpStatusCodeEnum.NOT_FOUND,
    message: ErrorMessageEnum.RESOURCE_NOT_FOUND,
  }),
});

export default ResourceNotFoundError;
