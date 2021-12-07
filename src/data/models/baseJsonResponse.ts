'use strict';

import { IBaseJsonResponse, IBaseJsonResponseConstructor } from '../types/response';

class BaseJsonResponse<T> implements IBaseJsonResponse<T> {
  public message: string;
  public success: boolean;
  public data?: T | null;

  constructor({ success, message, data }: IBaseJsonResponseConstructor<T>) {
    this.success = success;
    this.message = message;
    this.data = data || null;
  }
}

export default BaseJsonResponse;
