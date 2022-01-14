'use strict';

import { Request, Response } from 'express';
import ErrorMessageEnum from '../../data/enums/errorMessageEnum';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';

function notFoundHandlerMiddleware(request: Request, response: Response): void {
  response.status(HttpStatusCodeEnum.NOT_FOUND).json({ message: ErrorMessageEnum.ROUTE_NOT_FOUND, success: false });
}

export default notFoundHandlerMiddleware;
