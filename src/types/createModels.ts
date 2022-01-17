'use strict';

export type CreateUserData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type CreateProjectData = {
  name: string;
  description?: string;
  userId: number;
  color: string;
};

export type CreateTodoData = {
  name: string;
  description: string;
  userId: number;
  completedFl: boolean;
  dueDate?: Date;
};
