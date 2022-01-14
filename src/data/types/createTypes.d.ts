'use strict';

export type ICreateUserData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type ICreateProjectData = {
  name: string;
  description?: string;
  userId: number;
  color: string;
};

export type ICreateTodoData = {
  name: string;
  description: string;
  userId: number;
  completedFl: boolean;
  dueDate?: Date;
};
