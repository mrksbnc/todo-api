'use strict';

import jwt from 'jsonwebtoken';
import baseConfig from '../config/baseConfig';
import { ExpirationStatus, DecodedToken, TokenPayload } from '../data/types/token';

export function checkExpirationStatus(token: DecodedToken): ExpirationStatus {
  const now = Date.now();
  if (token.exp > now) return 'active';

  const threeHoursInMs = 3 * 60 * 60 * 1000;
  const threeHoursAfterExpiration = token.exp + threeHoursInMs;

  if (threeHoursAfterExpiration > now) return 'grace';
  return 'expired';
}

export function createToken(payload: TokenPayload): string {
  const token = jwt.sign(payload, baseConfig.auth.secret, { expiresIn: '24h' });
  return token;
}

export function decodeJwtToken(token: string): DecodedToken {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
