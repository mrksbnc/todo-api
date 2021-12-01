'use strict';

export interface IHttpExceptionConstructor {
  message: string;
  statusCode: number;
  error?: Error | unknown;
}
