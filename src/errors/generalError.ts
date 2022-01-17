'use strict';

import HttpError from './httpError';
import { IGerneralError, IGerneralErrorConstructor } from '../types/interfaces/IGeneralError';

class GeneralError extends Error implements IGerneralError {
  public name: string;
  public message: string;
  public httpError: HttpError;
  public stack?: string | undefined;

  constructor({ name, message, httpError, stack }: IGerneralErrorConstructor) {
    super();
    this.name = name;
    this.message = message;
    this.httpError = httpError;
    this.stack = stack;
  }
}

export default GeneralError;
