'use strict';

import PartialUser from './partialUser';
import { Project, Todo } from '@prisma/client';

export type LoginDTO = { token: string; user: PartialUser };
export type GetAppDataDTO = { user: PartialUser };
export type GetTodoByIdDTO = { todo?: Todo };
export type GetTodoCountDTO = { count: number };
export type GetManyTodoDTO = { collection: Todo[] };
export type GetUserByIdDTO = { user?: PartialUser };
export type GetProjectByIdDTO = { project: Project };
export type GetProjectCountDTO = { count: number };
export type GetManyProjectDTO = { collection: Project[] };
