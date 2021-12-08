'use strict';

class HttpException {
  status: number;
  message: string;

  constructor({ status, message }: { status: number; message: string }) {
    this.message = message;
    this.status = status;
  }
}

export default HttpException;
