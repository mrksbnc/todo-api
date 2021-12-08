'use strict';

import HttpException from './httpException';

class BaseException extends Error {
  public message: string;
  public httpException: HttpException;

  constructor({ message, httpException }: { message: string; httpException: HttpException }) {
    super(message);
    this.message = message;
    this.httpException = httpException;
  }
}

export default BaseException;
