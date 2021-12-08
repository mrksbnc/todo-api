'use strict';

import HttpException from './httpException';
import GeneralException from './generalException';
import HttpStatusCodeEnum from '../constants/httpStatusCodeEnum';
import ApiErrorMessageEnum from '../constants/apiErrorMessageEnum';

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
