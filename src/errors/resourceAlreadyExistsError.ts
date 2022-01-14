'use strict';

import HttpError from './httpError';
import GeneralError from './generalError';
import ErrorNameEnum from '../data/enums/errorNameEnum';
import ErrorMessageEnum from '../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';

const ResourceAlreadyExistsError = new GeneralError({
  name: ErrorNameEnum.RESOURCE_ALREADY_EXISTS,
  message: ErrorMessageEnum.RESOURCE_ALREADY_EXISTS,
  httpError: new HttpError({
    status: HttpStatusCodeEnum.CONFLICT,
    message: ErrorMessageEnum.RESOURCE_ALREADY_EXISTS,
  }),
});

export default ResourceAlreadyExistsError;
