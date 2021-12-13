'use strict';

import config from '../../config';
import { NextFunction, Request, Response } from 'express';
import ErrorMessageEnum from '../../data/constants/errorMessageEnum';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';

function requestMethodValidatorMiddleware(request: Request, response: Response, next: NextFunction) {
  config.server.enabled_request_methods.includes(request.method)
    ? next()
    : response
        .status(HttpStatusCodeEnum.METHOD_NOT_ALLOWED)
        .json({ success: false, message: ErrorMessageEnum.REQUEST_METHOD_NOT_ALLOWED });
}

export default requestMethodValidatorMiddleware;
