'use strict';

import { Request, Response, NextFunction } from 'express';
import HttpException from '../../data/exceptions/HttpException';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';

const errorHandlingMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  try {
    const message = error.message || 'Something went wrong';
    const statusCode = error.statusCode || HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
    const stack = error.stack ? '\r\n' + error.stack : '';

    console.error(`[${request.method}] ${request.path} | statusCode: ${statusCode} ${stack}`);
    response.status(statusCode).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorHandlingMiddleware;
