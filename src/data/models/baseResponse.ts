'use strict';

import HttpError from '../../errors/httpError';

class BaseResponse<T = null> {
  public dto: T | null;
  public isOk: boolean;
  public status: number;
  public createdAt: string;
  public message: string | null;
  public error: HttpError | null;

  constructor({
    dto,
    isOk,
    status,
    error = null,
    message = null,
  }: {
    dto: T;
    isOk: boolean;
    status: number;
    message: string | null;
    error: HttpError | null;
  }) {
    this.dto = dto;
    this.isOk = isOk;
    this.error = error;
    this.status = status;
    this.message = message;
    this.createdAt = new Date(Date.now()).toISOString();
  }
}

export default BaseResponse;
