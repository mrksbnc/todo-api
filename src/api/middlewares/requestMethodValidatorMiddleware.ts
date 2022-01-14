'use strict';

import config from '../../config/baseConfig';
import { NextFunction, Request, Response } from 'express';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';
import ErrorMessageEnum from '../../data/enums/errorMessageEnum';

function requestMethodValidatorMiddleware(request: Request, response: Response, next: NextFunction) {
  config.server.enabled_request_methods.includes(request.method)
    ? next()
    : response
        .status(HttpStatusCodeEnum.METHOD_NOT_ALLOWED)
        .json({ success: false, message: ErrorMessageEnum.REQUEST_METHOD_NOT_ALLOWED });
}

export default requestMethodValidatorMiddleware;
