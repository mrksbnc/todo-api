'use strict';

import Validator from 'validatorjs';
import { Todo } from '.prisma/client';
import TodoRepository from '../repositories/todoRepository';
import HttpException from '../data/exceptions/HttpException';
import ApiErrorMessageEnum from '../data/enums/apiErrorMessages';
import HttpStatusCodeEnum from '../data/enums/httpStatusCode';
import { isObjectEmpty, isValidNumericId } from '../helpers/validators';
import { IService, IServiceConstructor } from '../data/interfaces/service';
import { ICreateTodoArgs, IUpdateTodoArgs } from '../data/interfaces/repository';

class TodoService implements IService<TodoRepository> {
  public readonly repository;

  constructor({ repository }: IServiceConstructor<TodoRepository>) {
    this.repository = repository;
  }

  public async create(args: ICreateTodoArgs): Promise<void> {
    const createTodoObjectValidationRule = {
      todoName: 'required|string',
      todoDescription: 'required|string',
      createdBy: 'alpha_num',
    };

    const validator = new Validator(args, createTodoObjectValidationRule);
    if (validator.fails()) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }
    await this.repository.create(args);
  }

  public async findById(id: number): Promise<Todo | null> {
    if (!isValidNumericId(id)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    const todo = await this.repository.findById(id);
    if (!todo) {
      throw new HttpException({
        message: ApiErrorMessageEnum.NOT_FOUND,
        statusCode: HttpStatusCodeEnum.NOT_FOUND,
      });
    }

    return todo;
  }

  public async findManyByCollectionId(collectionId: number): Promise<Todo[]> {
    if (!isValidNumericId(collectionId)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    const todoList = await this.repository.findManyByCollectionId(collectionId);
    return todoList;
  }

  public async findManyByCreatedById(createdBy: number): Promise<Todo[]> {
    if (!isValidNumericId(createdBy)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    const todoList = await this.repository.findManyByCreatedById(createdBy);
    return todoList;
  }

  public async update({ id, data }: { id: number; data: IUpdateTodoArgs }): Promise<void> {
    if (!isValidNumericId(id) || isObjectEmpty<IUpdateTodoArgs>(data)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    await this.repository.update({ id, data });
  }

  public async delete(id: number): Promise<void> {
    if (!isValidNumericId(id)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    await this.repository.delete(id);
  }
}
export default TodoService;
