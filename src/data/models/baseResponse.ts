'use strict';

export interface IBaseResponseConstructor<T> {
  success?: boolean;
  data?: T | null;
  error?: unknown | null;
  message?: string | null;
}

class BaseResponse<T> {
  public success: boolean;
  public data: T | null;
  public error: unknown | null;
  public message: string | null;

  constructor({ success = true, message = null, data = null, error = null }: IBaseResponseConstructor<T>) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}

export default BaseResponse;
