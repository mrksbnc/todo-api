'use strict';

import { IHttpExceptionConstructor } from '../interfaces/exception';

class HttpException extends Error {
  public message: string;
  public statusCode: number;
  public error?: Error | unknown;
  constructor({ message, statusCode }: IHttpExceptionConstructor) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default HttpException;
