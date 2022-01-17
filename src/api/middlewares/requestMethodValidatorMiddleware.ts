'use strict';

import config from '../../config/baseConfig';
import { isResponseOk } from '../../utils/response';
import { NextFunction, Request, Response } from 'express';
import BaseResponse from '../../data/models/baseResponse';
import ErrorMessageEnum from '../../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';

function requestMethodValidatorMiddleware(request: Request, response: Response, next: NextFunction) {
  config.server.enabled_request_methods.includes(request.method)
    ? next()
    : response.status(HttpStatusCodeEnum.METHOD_NOT_ALLOWED).json(
        new BaseResponse({
          dto: null,
          status: HttpStatusCodeEnum.METHOD_NOT_ALLOWED,
          message: ErrorMessageEnum.REQUEST_METHOD_NOT_ALLOWED,
          isOk: isResponseOk(HttpStatusCodeEnum.METHOD_NOT_ALLOWED),
        }),
      );
}

export default requestMethodValidatorMiddleware;
