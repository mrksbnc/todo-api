'use strict';

interface ICreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface IUpdateUserData {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

interface ICreateListData {
  name: string;
  description: string;
  userId: number;
  color: string;
}

interface IUpdateListData {
  id: number;
  name?: string;
  description?: string;
  userId?: number;
  color?: string;
}

interface ICreateTodoData {
  name: string;
  description: string;
  userId: number;
  completedFl: boolean;
  dueDate?: Date;
}

interface IUpdateTodoData {
  id: number;
  name?: string;
  description?: string;
  userId?: number;
  completedFl?: boolean;
  dueDate?: Date;
}
