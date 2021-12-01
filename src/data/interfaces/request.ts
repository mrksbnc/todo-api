'use strict';

import { Request } from 'express';
import { PartialUser } from '../types/partialUser';

interface IExtendedRequest extends Request {
  userId: number;
  partialUser: PartialUser;
}

export default IExtendedRequest;
