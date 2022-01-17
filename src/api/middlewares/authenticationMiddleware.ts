'use strict';

import jwt from 'jsonwebtoken';
import config from '../../config/baseConfig';
import { isResponseOk } from '../../utils/response';
import BaseResponse from '../../data/models/baseResponse';
import { Request, Response, NextFunction } from 'express';
import TokenNotFoundError from '../../errors/tokenNotFoundError';
import InvalidAuthTokenError from '../../errors/invalidAuthTokenError';
import { checkExpirationStatus, createToken, decodeJwtToken } from '../../utils/token';

function authenticationMiddleware(request: Request, response: Response, next: NextFunction) {
  if (request.path === '/' || request.path.includes('register') || request.path.includes('login')) {
    next();
    return;
  }

  const bearerToken = request.headers['authorization'];
  if (!bearerToken) {
    response.status(TokenNotFoundError.httpError.status).json(
      new BaseResponse({
        dto: null,
        status: TokenNotFoundError.httpError.status,
        message: TokenNotFoundError.httpError.message,
        isOk: isResponseOk(TokenNotFoundError.httpError.status),
      }),
    );
    return;
  }

  const token = bearerToken.split(' ')[1];
  const decodedPayload = decodeJwtToken(token);
  try {
    jwt.verify(token.trim(), config.auth.secret);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const tokenExpirationStatus = checkExpirationStatus(decodedPayload);
      if (tokenExpirationStatus === 'grace') {
        const newToken = createToken({
          userId: decodedPayload.userId,
          email: decodedPayload.email,
          name: decodedPayload.name,
        });
        response.set('authorization', 'Bearer ' + newToken);
        next();
        return;
      }
    }
    response.status(InvalidAuthTokenError.httpError.status).json(
      new BaseResponse({
        dto: null,
        status: InvalidAuthTokenError.httpError.status,
        message: InvalidAuthTokenError.httpError.message,
        isOk: isResponseOk(InvalidAuthTokenError.httpError.status),
      }),
    );
    return;
  }

  response.locals.userId = decodedPayload.userId;
  const newToken = createToken({
    userId: decodedPayload.userId,
    email: decodedPayload.email,
    name: decodedPayload.name,
  });
  response.set('authorization', 'Bearer ' + newToken);
  next();
}

export default authenticationMiddleware;
