'use strict';

import logger from '../../utils/logger';
import { Request, Response } from 'express';
import BaseJsonResponse from '../../data/models/baseJsonResponse';
import GeneralException from '../../data/errors/generalException';

const errorHandler = (exception: GeneralException, request: Request, response: Response): void => {
  const error = exception.error;
  const message = exception.message;
  const httpException = exception.httpException;

  logger.error(message, error);

  response
    .status(httpException.status)
    .json(new BaseJsonResponse<null>({ success: false, message: httpException.message }));
};

export default errorHandler;
