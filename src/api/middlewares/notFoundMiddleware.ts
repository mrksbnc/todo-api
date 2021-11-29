'use strict';

import { Request, Response } from 'express';
import HttpStatusCodes from '../../data/enums/httpStatusCodeEnum';

const notFoundMiddleware = (request: Request, response: Response) => {
  response.status(HttpStatusCodes.NOT_FOUND).json({ message: 'The requested resource could not be found' });
};

export default notFoundMiddleware;
