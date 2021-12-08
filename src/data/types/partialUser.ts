'use strict';

import { User } from '.prisma/client';

type PartialUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
export default PartialUser;
