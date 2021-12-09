'use strict';

import jwt from 'jsonwebtoken';
import config from '../../config';
import { decodeJwtToken } from '../../utils/token';
import { Request, Response, NextFunction } from 'express';
import BaseResponse from '../../data/models/baseResponse';
import ErrorMessageEnum from '../../data/constants/errorMessageEnum';
import TokenNotFoundError from '../../data/errors/tokenNotFoundError';
import HttpStatusCodeEnum from '../../data/constants/httpStatusCodeEnum';
import InvalidTokenError from '../../data/errors/invalidTokenError';

const authenticationMiddleware = function (request: Request, response: Response, next: NextFunction) {
  if (request.path.includes('register') || request.path.includes('login')) {
    next();
    return;
  }

  const token = String(request.cookies['todo_api_authorization']);
  if (!token) {
    response
      .status(TokenNotFoundError.httpException.status)
      .json(new BaseResponse({ success: false, message: TokenNotFoundError.httpException.message }));
    return;
  }

  try {
    jwt.verify(token, config.auth.secret);
  } catch (error) {
    response
      .status(InvalidTokenError.httpException.status)
      .json(new BaseResponse({ success: false, message: InvalidTokenError.httpException.message }));
    return;
  }

  const decodedPayload = decodeJwtToken(token);
  response.locals.userId = decodedPayload.userId;

  const newToken = jwt.sign(decodedPayload, config.auth.secret, {
    expiresIn: config.auth.jwt_exp,
  });

  response.cookie('todo_api_authorization', newToken, {
    secure: config.isProd,
    maxAge: 86400 * 1000,
    httpOnly: false,
  });
  next();
};

export default authenticationMiddleware;
