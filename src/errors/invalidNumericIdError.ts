'use strict';

import HttpError from './httpError';
import GeneralError from './generalError';
import ErrorNameEnum from '../data/enums/errorNameEnum';
import ErrorMessageEnum from '../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';

const InvalidNumericIdError = new GeneralError({
  name: ErrorNameEnum.INVALID_NUMERIC_ID,
  message: ErrorMessageEnum.INVALID_NUMERIC_ID,
  httpError: new HttpError({
    status: HttpStatusCodeEnum.BAD_REQUEST,
    message: ErrorMessageEnum.INVALID_NUMERIC_ID,
  }),
});

export default InvalidNumericIdError;
