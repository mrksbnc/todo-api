'use strict';

export interface IBaseResponseConstructor<T> {
  success?: boolean;
  data?: T | null;
  message?: string | null;
}

class BaseResponse<T> {
  public data: T | null;
  public success: boolean;
  public message: string | null;

  constructor({ success = true, message = null, data = null }: IBaseResponseConstructor<T>) {
    this.data = data;
    this.success = success;
    this.message = message;
  }
}

export default BaseResponse;
