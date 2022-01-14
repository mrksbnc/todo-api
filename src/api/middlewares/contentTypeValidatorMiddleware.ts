'use strict';

import { NextFunction, Request, Response } from 'express';
import ErrorMessageEnum from '../../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';

function contentTypeValidatorMiddleware(request: Request, response: Response, next: NextFunction) {
  request.headers['content-type'] !== 'application/json'
    ? response.status(HttpStatusCodeEnum.BAD_REQUEST).send(ErrorMessageEnum.INVALID_CONTENT_TYPE)
    : next();
}

export default contentTypeValidatorMiddleware;
