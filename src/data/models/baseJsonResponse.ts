'use strict';

import { IBaseJsonResponse, IBaseJsonResponseConstructor } from '../types/response';

class BaseJsonResponse<T> implements IBaseJsonResponse<T> {
  public message: string;
  public success: boolean;
  public data: T | null;
  public error: Error | null;

  constructor({ success, message, data, error }: IBaseJsonResponseConstructor<T>) {
    this.message = message;
    this.data = data || null;
    this.error = error || null;
    this.success = success || true;
  }
}

export default BaseJsonResponse;
