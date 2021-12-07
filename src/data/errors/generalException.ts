'use strict';

import HttpException from './httpException';

class GeneralException extends Error {
  public message: string;
  public error?: Error | unknown;
  public httpException: HttpException;

  constructor({
    message,
    httpException,
    error,
  }: {
    message: string;
    httpException: HttpException;
    error?: Error | unknown;
  }) {
    super();
    this.message = message;
    this.error = error;
    this.httpException = httpException;
  }
}

export default GeneralException;
