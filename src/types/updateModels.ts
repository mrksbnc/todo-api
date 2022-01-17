'use strict';

export type UpdateUserData = {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

export type UpdateProjectData = {
  id: number;
  name?: string;
  description?: string;
  userId?: number;
  color?: string;
};

export type UpdateTodoData = {
  id: number;
  name?: string;
  description?: string;
  userId?: number;
  completedFl?: boolean;
  dueDate?: Date;
};
