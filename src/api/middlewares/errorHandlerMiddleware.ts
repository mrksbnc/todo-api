'use strict';

import logger from '../../utils/logger';
import { NextFunction, Request, Response } from 'express';
import HttpException from '../../data/exceptions/httpException';
import BaseException from '../../data/exceptions/baseException';
import ErrorMessageEnum from '../../data/constants/errorMessageEnum';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';

function errorHandlerMiddleware(error: unknown, request: Request, response: Response, next: NextFunction) {
  let responseStatusCode = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
  let responseErrorMessage = String(ErrorMessageEnum.INTERNAL_SERVVER_ERROR);

  if (error instanceof HttpException) {
    responseErrorMessage = error.message;
    responseStatusCode = error.status;
  }

  if (error instanceof BaseException) {
    responseStatusCode = error.httpException.status;
    responseErrorMessage = error.httpException.message;
  }

  if (response.headersSent) {
    return next(error);
  }

  response.status(responseStatusCode);
  response.format({
    'application/json': () => {
      response.json({ success: false, message: responseErrorMessage });
    },
    default: () => {
      response.type('text/plain').send(responseErrorMessage);
    },
  });

  const _e = error as Error;
  logger.error(_e.message, '\r\n', error);
  next();
}

export default errorHandlerMiddleware;
