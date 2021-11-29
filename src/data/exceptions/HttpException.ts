'use strict';

import { HttpExceptionConstructor } from '../../interfaces/exceptionInterfaces';

class HttpException extends Error {
  public message: string;
  public statusCode: number;

  constructor({ message, statusCode }: HttpExceptionConstructor) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default HttpException;
