'use strict';

import HttpException from './httpException';

class BaseException extends Error {
  public stack?: string;
  public message: string;
  public httpException: HttpException;

  constructor({ message, httpException, stack }: { message: string; httpException: HttpException; stack?: string }) {
    super(message);
    this.stack = stack;
    this.message = message;
    this.httpException = httpException;
  }
}

export default BaseException;
