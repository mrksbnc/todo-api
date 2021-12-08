'use strict';

import { Request, Response } from 'express';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';
import ApiErrorMessageEnum from '../../data/constants/apiErrorMessageEnum';

const notFoundHandlerMiddleware = (request: Request, response: Response): void => {
  response.status(HttpStatusCodeEnum.NOT_FOUND).json({ message: ApiErrorMessageEnum.NOT_FOUND, success: false });
};

export default notFoundHandlerMiddleware;
