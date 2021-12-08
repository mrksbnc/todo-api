'use strict';

import logger from '../../utils/logger';
import BaseResponse from '../../data/models/baseResponse';
import { NextFunction, Request, Response } from 'express';
import HttpException from '../../data/exceptions/httpException';
import BaseException from '../../data/exceptions/BaseException';
import ErrorMessageEnum from '../../data/constants/errorMessageEnum';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';

function getErrorDetails(error: unknown) {
  if (error instanceof BaseException) return { message: error.message, stack: error.stack, error };
  if (error instanceof HttpException) return { message: error.message, stack: null, error };
  return { message: ErrorMessageEnum.INTERNAL_SERVVER_ERROR, stack: null, error };
}

function logErrorMessage({ message, stack, error }: { message: string; stack?: string | null; error: unknown }) {
  logger.error(message, stack ? '\r\n' + stack : '', JSON.stringify(error));
}

function getHttpStatusCode(error: unknown): number {
  if (error instanceof HttpException) {
    return error.status;
  }
  if (error instanceof BaseException) {
    return error.httpException.status;
  }

  return HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
}

function errorHandlerMiddleware(error: unknown, request: Request, response: Response, next: NextFunction) {
  const { message, stack } = getErrorDetails(error);
  const statusCode = getHttpStatusCode(error);

  logErrorMessage({ message, stack, error });

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
