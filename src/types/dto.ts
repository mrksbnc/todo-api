'use strict';

import { Todo } from '@prisma/client';
import PartialUser from './partialUser';

export type LoginDTO = { token: string; user: PartialUser };
export type GetAppDataDTO = { user: PartialUser };
export type GetTodoByIdDTO = { todo?: Todo };
export type GetTodoCountDTO = { count: number };
export type GetManyTodoDTO = { collection: Todo[] };
