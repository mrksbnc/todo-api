'use strict';

import { Request } from 'express';

interface ExtendedRequest extends Request {
  userId: number;
}

export default ExtendedRequest;
