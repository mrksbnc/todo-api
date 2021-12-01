'use strict';

import logger from '../../utils/logger';
import { Request, Response, NextFunction } from 'express';
import HttpException from '../../data/exceptions/HttpException';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCode';

const errorHandlingMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  try {
    const message = error.message || 'Something went wrong';
    const statusCode = error.statusCode || HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;

    logger.error(error);

    response.status(statusCode).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorHandlingMiddleware;
