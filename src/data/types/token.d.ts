'use strict';

export type ExpirationStatus = 'expired' | 'active' | 'grace';

export type TokenPayload = {
  userId: number;
  email: string;
  name: string;
};

export type DecodedToken = {
  userId: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
};
