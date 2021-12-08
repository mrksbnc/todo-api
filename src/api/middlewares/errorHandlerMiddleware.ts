'use strict';

import logger from '../../utils/logger';
import BaseResponse from '../../data/models/baseResponse';
import { NextFunction, Request, Response } from 'express';
import HttpException from '../../data/exceptions/httpException';
import BaseException from '../../data/exceptions/BaseException';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';
import ApiErrorMessageEnum from '../../data/constants/apiErrorMessageEnum';

function getErrorDetails(error: any) {
  if (error instanceof BaseException) {
    return { message: error.message, stack: error.stack };
  }

  if (error instanceof HttpException) {
    return { message: error.message, stack: null };
  }

  return { message: ApiErrorMessageEnum.INTERNAL_SERVVER_ERROR, stack: null };
}

function logErrorMessage({ message, stack }: { message: string; stack?: string | null }) {
  logger.error(message, stack);
}

function isErrorStatusCode(statusCode: number): boolean {
  return statusCode >= 400 && statusCode < 600;
}

function getHttpStatusCode({ error, response }: { error: any; response: Response }): number {
  const statusCodeFromError = error.status || error.statusCode;
  if (error instanceof BaseException) {
    if (isErrorStatusCode(error.httpException.status)) {
      return error.httpException.status;
    }
  }
  if (error instanceof HttpException) {
    if (isErrorStatusCode(error.status)) {
      return error.status;
    }
  }
  if (isErrorStatusCode(statusCodeFromError)) {
    return statusCodeFromError;
  }
  const statusCodeFromResponse = response.statusCode;
  if (isErrorStatusCode(statusCodeFromResponse)) {
    return statusCodeFromResponse;
  }
  return HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
}

function errorHandlerMiddleware(error: unknown, request: Request, response: Response, next: NextFunction) {
  const { message, stack } = getErrorDetails(error);
  const statusCode = getHttpStatusCode({ error, response });

  logErrorMessage({ message, stack });

  if (response.headersSent) {
    return next(error);
  }

  response.status(statusCode);
  response.format({
    'application/json': () => {
      response.json(new BaseResponse({ success: false, message: getErrorDetails(error).message }));
    },
    default: () => {
      response.type('text/plain').send(getErrorDetails(error).message);
    },
  });
  next();
}

export default errorHandlerMiddleware;
