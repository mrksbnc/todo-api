'use strict';

export interface IGerneralError {
  name: string;
  stack?: string;
  message: string;
  httpError: HttpError;
}

export interface IGerneralErrorConstructor {
  name: string;
  message: string;
  httpError: HttpError;
  stack?: string;
}
