'use strict';

class BaseResponse<T = null> {
  public dto: T | null;
  public isOk: boolean;
  public status: number;
  public createdAt: string;
  public message: string | null;

  constructor({
    dto,
    isOk,
    status,
    message = null,
  }: {
    dto: T;
    isOk: boolean;
    status: number;
    message: string | null;
  }) {
    this.dto = dto;
    this.isOk = isOk;
    this.status = status;
    this.message = message;
    this.createdAt = new Date(Date.now()).toISOString();
  }
}

export default BaseResponse;
