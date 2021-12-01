'use strict';

import { Request } from 'express';

interface IExtendedRequest extends Request {
  userId: number;
}

export default IExtendedRequest;
