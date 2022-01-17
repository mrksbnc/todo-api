'use strict';

import PartialUser from './partialUser';

export type LoginDTO = { token: string; user: PartialUser };
export type GetAppDataDTO = { user: PartialUser };
