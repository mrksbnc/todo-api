'use strict';

import { User } from '.prisma/client';

export type PartialUser = Omit<User, 'password' | 'createdAt' | 'modifiedAt'>;
