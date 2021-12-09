'use strict';

import jwt from 'jsonwebtoken';
import config from '../config';
import { ExpirationStatus, IDecodedToken, ITokenPayload } from '../data/types/token';

export function checkExpirationStatus(token: IDecodedToken): ExpirationStatus {
  const now = Date.now();
  if (token.exp > now) return 'active';

  const threeHoursInMs = 3 * 60 * 60 * 1000;
  const threeHoursAfterExpiration = token.exp + threeHoursInMs;

  if (threeHoursAfterExpiration > now) return 'grace';
  return 'expired';
}

export function createToken(payload: ITokenPayload): string {
  const token = jwt.sign(payload, config.auth.secret, { expiresIn: '24h' });
  return token;
}

export function decodeJwtToken(token: string): IDecodedToken {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
