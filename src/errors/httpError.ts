'use strict';

import { IHttpError, IHttpErrorConstructor } from '../data/interfaces/IHttpError';

class HttpError implements IHttpError {
  public status: number;
  public message: string;

  constructor({ status, message }: IHttpErrorConstructor) {
    this.status = status;
    this.message = message;
  }
}

export default HttpError;
