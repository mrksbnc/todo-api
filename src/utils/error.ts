'use strict';

import HttpException from '../data/errors/httpException';
import GeneralException from '../data/errors/generalException';
import HttpStatusCodeEnum from '../data/constants/httpStatusCodeEnum';
import ApiErrorMessageEnum from '../data/constants/apiErrorMessageEnum';

export function generateInternalError(error: GeneralException | Error | unknown) {
  if (error instanceof GeneralException) {
    return error;
  }

  if (error instanceof Error) {
    return new GeneralException({
      error,
      message: error.message,
      httpException: new HttpException({
        message: ApiErrorMessageEnum.INTERNAL_SERVVER_ERROR,
        status: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
      }),
    });
  }

  const _e = error as Error;
  return new GeneralException({
    error,
    message: _e.message,
    httpException: new HttpException({
      message: ApiErrorMessageEnum.INTERNAL_SERVVER_ERROR,
      status: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
    }),
  });
}
