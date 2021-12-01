'use strict';

import { Todo } from '.prisma/client';
import Validator from 'validatorjs';
import ApiErrorMessageEnum from '../data/enums/apiErrorMessages';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';
import HttpException from '../data/exceptions/HttpException';
import { ICreateTodoArgs, IUpdateTodoArgs } from '../data/interfaces/repositoryInterfaces';
import { IService, IServiceConstructor } from '../data/interfaces/serviceInterfaces';
import TodoRepository from '../repositories/todoRepository';
import ServiceHelper from './serviceHelper';

class TodoService extends ServiceHelper implements IService<TodoRepository> {
  public readonly repository;

  constructor({ repository }: IServiceConstructor<TodoRepository>) {
    super();
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
    if (!this.isValidNumericId(id)) {
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
    if (!this.isValidNumericId(collectionId)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    const todoList = await this.repository.findManyByCollectionId(collectionId);
    return todoList;
  }

  public async findManyByCreatedById(createdBy: number): Promise<Todo[]> {
    if (!this.isValidNumericId(createdBy)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    const todoList = await this.repository.findManyByCreatedById(createdBy);
    return todoList;
  }

  public async update({ id, data }: { id: number; data: IUpdateTodoArgs }): Promise<void> {
    if (!this.isValidNumericId(id) || this.isObjectEmpty<IUpdateTodoArgs>(data)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    await this.repository.update({ id, data });
  }

  public async delete(id: number): Promise<void> {
    if (!this.isValidNumericId(id)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    await this.repository.delete(id);
  }
}
export default TodoService;
