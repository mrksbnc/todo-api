'use strict';

import HttpException from './httpException';

class BaseException extends Error {
  public name: string;
  public stack?: string;
  public message: string;
  public httpException: HttpException;

  constructor({
    message,
    name,
    stack,
    httpException,
  }: {
    message: string;
    name: string;
    stack?: string;
    httpException: HttpException;
  }) {
    super();
    this.name = name;
    this.stack = stack;
    this.message = message;
    this.httpException = httpException;
  }
}

export default BaseException;
