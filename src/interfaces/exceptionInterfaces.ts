'use strict';

export interface HttpExceptionConstructor {
  message: string;
  statusCode: number;
}
