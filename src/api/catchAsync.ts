'use strict';

import { Request, Response, NextFunction } from 'express';

const catchAsync = (fn: Function) => {
  return (request: Request, response: Response, next: NextFunction) => {
    fn(request, response, next).catch(next);
  };
};

export default catchAsync;
