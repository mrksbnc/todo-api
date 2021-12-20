'use strict';

export interface ICreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUpdateUserData {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface ICreateProjectData {
  name: string;
  description?: string;
  userId: number;
}

export interface IUpdateProjectData {
  id: number;
  name?: string;
  description?: string;
  userId?: number;
}

export interface ICreateTodoData {
  name: string;
  description: string;
  userId: number;
  dueDate?: Date;
  listId?: number;
  important?: boolean;
  completedFl?: boolean;
}

export interface IUpdateTodoData {
  id: number;
  name?: string;
  description?: string;
  userId?: number;
  listId?: number;
  important?: boolean;
  completedFl?: boolean;
  dueDate?: Date;
}
