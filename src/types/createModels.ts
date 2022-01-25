'use strict';

import { Project, Todo, User } from '@prisma/client';

export type CreateProjectData = Pick<Project, 'name' | 'description' | 'userId'>;
export type CreateUserData = Pick<User, 'email' | 'firstName' | 'lastName' | 'password'>;
export type CreateTodoData = Pick<Todo, 'name' | 'description' | 'userId' | 'completedFl' | 'dueDate'>;
