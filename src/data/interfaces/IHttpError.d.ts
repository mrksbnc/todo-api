'use strict';

export interface IHttpError {
  status: number;
  message: string;
}

export interface IHttpErrorConstructor {
  status: number;
  message: string;
}
