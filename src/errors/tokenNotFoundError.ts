'use strict';

import HttpError from './httpError';
import GeneralError from './generalError';
import ErrorNameEnum from '../data/enums/errorNameEnum';
import ErrorMessageEnum from '../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';

const TokenNotFoundError = new GeneralError({
  name: ErrorNameEnum.TOKEN_NOT_FOUND,
  message: ErrorMessageEnum.TOKEN_NOT_FOUND,
  httpError: new HttpError({
    status: HttpStatusCodeEnum.NOT_FOUND,
    message: ErrorMessageEnum.TOKEN_NOT_FOUND,
  }),
});

export default TokenNotFoundError;
