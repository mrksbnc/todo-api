'use strict';

import { Request, Response } from 'express';
import { isResponseOk } from '../../utils/response';
import BaseResponse from '../../data/models/baseResponse';
import ErrorMessageEnum from '../../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';

function notFoundHandlerMiddleware(request: Request, response: Response): void {
  response.status(HttpStatusCodeEnum.NOT_FOUND).json(
    new BaseResponse({
      dto: null,
      status: HttpStatusCodeEnum.NOT_FOUND,
      message: ErrorMessageEnum.ROUTE_NOT_FOUND,
      isOk: isResponseOk(HttpStatusCodeEnum.NOT_FOUND),
    }),
  );
}

export default notFoundHandlerMiddleware;
