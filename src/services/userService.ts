'use strict';

import bcrypt from 'bcrypt';
import Validator from 'validatorjs';
import config from '../config/config';
import { PartialUser } from '../data/types/partialUser';
import UserRepository from '../repositories/userRepository';
import HttpException from '../data/exceptions/HttpException';
import ApiErrorMessageEnum from '../data/enums/apiErrorMessages';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';
import { isObjectEmpty, isValidNumericId } from '../helpers/validators';
import { IService, IServiceConstructor } from '../data/interfaces/serviceInterfaces';
import { ICreateUserArgs, IUpdateUserArgs } from '../data/interfaces/repositoryInterfaces';

class UserService implements IService<UserRepository> {
  public readonly repository;

  constructor({ repository }: IServiceConstructor<UserRepository>) {
    this.repository = repository;
  }

  private async generatePasswordHash(plainTextPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(config.auth.saltRounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);
    return hash;
  }

  public async create(args: ICreateUserArgs): Promise<void> {
    const createUserObjectValidationRule = {
      email: 'required|string|email|max:50',
      firstName: 'required|string|max:30',
      lastName: 'required|string|max:30',
      password: 'required|string',
    };

    const validator = new Validator(args, createUserObjectValidationRule);
    if (validator.fails()) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    const user = await this.repository.findByEmail(args.email);
    if (user) {
      throw new HttpException({
        message: ApiErrorMessageEnum.SEE_OTHER,
        statusCode: HttpStatusCodeEnum.SEE_OTHER,
      });
    }

    const plainTextPassword = args.password;
    const hash = await this.generatePasswordHash(plainTextPassword);

    const insertData: ICreateUserArgs = {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      password: hash,
    };

    await this.repository.create(insertData);
  }

  public async findById(id: number): Promise<PartialUser> {
    if (!isValidNumericId(id)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    const user = await this.repository.findById(id);
    if (!user) {
      throw new HttpException({
        message: ApiErrorMessageEnum.NOT_FOUND,
        statusCode: HttpStatusCodeEnum.NOT_FOUND,
      });
    }

    return this.repository.createPartialUser(user);
  }

  public async findByEmail(email: string): Promise<PartialUser> {
    const validator = new Validator(email, { email: 'string|email|max:50' });

    if (validator.fails()) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new HttpException({
        message: ApiErrorMessageEnum.NOT_FOUND,
        statusCode: HttpStatusCodeEnum.NOT_FOUND,
      });
    }

    return this.repository.createPartialUser(user);
  }

  public async update({ id, data }: { id: number; data: IUpdateUserArgs }): Promise<void> {
    if (!isValidNumericId(id) || isObjectEmpty<IUpdateUserArgs>(data)) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        statusCode: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    if (data?.password) {
      const plainTextPassword = data?.password;
      const hash = await this.generatePasswordHash(plainTextPassword);

      delete data.password;
      data.password = hash;
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

export default UserService;
