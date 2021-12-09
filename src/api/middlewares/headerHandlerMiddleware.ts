'use strict';

import { NextFunction, Request, Response } from 'express';

function headerHandlerMiddleware(request: Request, response: Response, next: NextFunction) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
}

export default headerHandlerMiddleware;
