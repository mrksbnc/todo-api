'use strict';

import { Request, Response } from 'express';
import BaseJsonResponse from '../../data/models/baseJsonResponse';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';
import ApiErrorMessageEnum from '../../data/constants/apiErrorMessageEnum';

const notFoundHandler = (request: Request, response: Response): void => {
  response.status(HttpStatusCodeEnum.NOT_FOUND).json(
    new BaseJsonResponse({
      data: null,
      success: false,
      message: ApiErrorMessageEnum.ROUTE_NOT_FOUND,
    }),
  );
};

export default notFoundHandler;
