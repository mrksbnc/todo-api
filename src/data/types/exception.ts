'use strict';

import HttpException from '../exceptions/httpException';

export interface IBaseException {
  message?: string;
  httpException: HttpException;
  error: Error | unknown;
}
