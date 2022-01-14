'use strict';

import logger from '../../utils/logger';
import HttpError from '../../errors/httpError';
import GeneralError from '../../errors/generalError';
import { NextFunction, Request, Response } from 'express';
import ErrorMessageEnum from '../../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';

function errorHandlerMiddleware(error: unknown, request: Request, response: Response, next: NextFunction) {
  let responseStatusCode = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
  let responseErrorMessage = String(ErrorMessageEnum.INTERNAL_SERVVER_ERROR);

  if (error instanceof HttpError) {
    responseErrorMessage = error.message;
    responseStatusCode = error.status;
  }

  if (error instanceof GeneralError) {
    responseStatusCode = error.httpError.status;
    responseErrorMessage = error.httpError.message;
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
