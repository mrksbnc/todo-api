'use strict';

import HttpException from './httpException';

class GeneralException extends Error {
  public message: string;
  public error?: Error | unknown;
  public httpException: HttpException;
}

export default GeneralException;
