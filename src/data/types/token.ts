'use strict';

export type ExpirationStatus = 'expired' | 'active' | 'grace';

export interface ITokenPayload {
  userId: number;
  name: string;
}

export interface IDecodedToken {
  userId: number;
  name: string;
  iat: number;
  exp: number;
}
