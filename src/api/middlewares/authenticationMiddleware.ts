'use strict';

import jwt from 'jsonwebtoken';
import config from '../../config/baseConfig';
import { Request, Response, NextFunction } from 'express';

import { checkExpirationStatus, createToken, decodeJwtToken } from '../../utils/token';
import TokenNotFoundError from '../../errors/tokenNotFoundError';
import InvalidAuthTokenError from '../../errors/invalidAuthTokenError';

function authenticationMiddleware(request: Request, response: Response, next: NextFunction) {
  if (request.path.includes('register') || request.path.includes('login')) {
    next();
    return;
  }

  const bearerToken = request.headers['authorization'];
  if (!bearerToken) {
    response
      .status(TokenNotFoundError.httpError.status)
      .json({ success: false, message: TokenNotFoundError.httpError.message });
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
    response
      .status(InvalidAuthTokenError.httpError.status)
      .json({ success: false, message: InvalidAuthTokenError.httpError.message });
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
