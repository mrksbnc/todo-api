'use strict';

export interface IBaseJsonResponse<T = undefined | null> {
  success: boolean;
  message: string;
  data?: T | null;
}

export interface IBaseJsonResponseConstructor<T> {
  success: boolean;
  message: string;
  data?: T | null;
}
