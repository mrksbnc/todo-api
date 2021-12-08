'use strict';

import config from '../../config';
import logger from '../../utils/logger';
import { NextFunction, Request, Response } from 'express';
import HttpException from '../../data/exceptions/httpException';
import BaseException from '../../data/exceptions/BaseException';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';

function getErrorMessage(error: any): string {
  if (error instanceof BaseException) {
    return error.message;
  }
  if (error instanceof HttpException) {
    return error.message;
  }
  if (error.stack) {
    return error.stack;
  }
  if (typeof error.toString === 'function') {
    return error.toString();
  }
  return '';
}

function logErrorMessage(error: any) {
  logger.error(error);
}

function isErrorStatusCode(statusCode: number): boolean {
  return statusCode >= 400 && statusCode < 600;
}

function getHttpStatusCode({ error, response }: { error: any; response: Response }): number {
  let statusCodeFromError = error.status || error.statusCode;
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

function errorHandlerMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
  const errorMessage = getErrorMessage(error);

  logErrorMessage(errorMessage);

  if (response.headersSent) {
    return next(error);
  }

  const errorResponse = {
    statusCode: getHttpStatusCode({ error, response }),
    body: '',
  };

  if (!config.isProd) {
    errorResponse.body = errorMessage;
  }
  response.status(errorResponse.statusCode);
  response.format({
    'application/json': () => {
      response.json({ message: errorResponse.body });
    },
    default: () => {
      response.type('text/plain').send(errorResponse.body);
    },
  });
  next();
}

export default errorHandlerMiddleware;
