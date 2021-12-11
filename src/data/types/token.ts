'use strict';

export type ExpirationStatus = 'expired' | 'active' | 'grace';

export interface ITokenPayload {
  userId: number;
  email: string;
  name: string;
}

export interface IDecodedToken {
  userId: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
