'use strict';

import { isResponseOk } from '../../utils/response';
import { NextFunction, Request, Response } from 'express';
import BaseResponse from '../../data/models/baseResponse';
import ErrorMessageEnum from '../../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';

function contentTypeValidatorMiddleware(request: Request, response: Response, next: NextFunction) {
  request.headers['content-type'] !== 'application/json'
    ? response.status(HttpStatusCodeEnum.BAD_REQUEST).json(
        new BaseResponse({
          dto: null,
          status: HttpStatusCodeEnum.BAD_REQUEST,
          message: ErrorMessageEnum.INVALID_CONTENT_TYPE,
          isOk: isResponseOk(HttpStatusCodeEnum.BAD_REQUEST),
        }),
      )
    : next();
}

export default contentTypeValidatorMiddleware;
