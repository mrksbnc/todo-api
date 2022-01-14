'use strict';

export type IUpdateUserData = {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

export type IUpdateProjectData = {
  id: number;
  name?: string;
  description?: string;
  userId?: number;
  color?: string;
};

export type IUpdateTodoData = {
  id: number;
  name?: string;
  description?: string;
  userId?: number;
  completedFl?: boolean;
  dueDate?: Date;
};
