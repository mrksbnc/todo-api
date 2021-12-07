'use strict';

import logger from '../../utils/logger';
import { NextFunction, Request, Response } from 'express';
import HttpException from '../../data/errors/httpException';
import GeneralException from '../../data/errors/generalException';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';

const errorHandler = (exception: GeneralException, request: Request, response: Response, next: NextFunction): void => {
  let httpException = exception?.httpException;
  if (!httpException) {
    httpException = new HttpException({
      message: 'Something went wrong',
      status: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
    });
  }
  logger.error(exception);
  response.status(httpException.status).json({ message: httpException.message });
};

export default errorHandler;
