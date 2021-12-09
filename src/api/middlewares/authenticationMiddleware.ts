'use strict';

import jwt from 'jsonwebtoken';
import config from '../../config';
import { Request, Response, NextFunction } from 'express';
import BaseResponse from '../../data/models/baseResponse';
import InvalidTokenError from '../../data/errors/invalidTokenError';
import TokenNotFoundError from '../../data/errors/tokenNotFoundError';
import { checkExpirationStatus, createToken, decodeJwtToken } from '../../utils/token';

const authenticationMiddleware = function (request: Request, response: Response, next: NextFunction) {
  if (request.path.includes('register') || request.path.includes('login')) {
    next();
    return;
  }

  const token = request.cookies['todo_api_authorization'] as string;
  if (!token) {
    response
      .status(TokenNotFoundError.httpException.status)
      .json(new BaseResponse({ success: false, message: TokenNotFoundError.httpException.message }));
    return;
  }

  const decodedPayload = decodeJwtToken(token);
  try {
    jwt.verify(token, config.auth.secret);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const tokenExpirationStatus = checkExpirationStatus(decodedPayload);
      if (tokenExpirationStatus === 'grace') {
        const newToken = createToken(decodedPayload);

        response.cookie('todo_api_authorization', newToken, {
          secure: config.isProd,
          maxAge: 86400 * 1000,
          httpOnly: false,
        });
        next();
      }
    }

    response
      .status(InvalidTokenError.httpException.status)
      .json(new BaseResponse({ success: false, message: InvalidTokenError.httpException.message }));
    return;
  }

  response.locals.userId = decodedPayload.userId;

  const newToken = createToken(decodedPayload);

  response.cookie('todo_api_authorization', newToken, {
    secure: config.isProd,
    maxAge: 86400 * 1000,
    httpOnly: false,
  });
  next();
};

export default authenticationMiddleware;
