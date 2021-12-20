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
  color: string;
}

export interface IUpdateProjectData {
  id: number;
  name?: string;
  description?: string;
  userId?: number;
  color?: string;
}

export interface ICreateTodoData {
  name: string;
  description: string;
  userId: number;
  completedFl: boolean;
  dueDate?: Date;
}

export interface IUpdateTodoData {
  id: number;
  name?: string;
  description?: string;
  userId?: number;
  completedFl?: boolean;
  dueDate?: Date;
}
