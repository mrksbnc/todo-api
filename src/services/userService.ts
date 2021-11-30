'use strict';

import bcrypt from 'bcrypt';
import Validator from 'validatorjs';
import { User } from '.prisma/client';
import { PartialUser } from '../types/userTypes';
import UserRepository from '../repositories/userRepository';
import HttpException from '../data/exceptions/HttpException';
import ApiErrorMessageEnum from '../data/enums/apiErrorMessages';
import HttpStatusCodeEnum from '../data/enums/httpStatusCodeEnum';
import { ICreateUserArgs } from '../interfaces/repositoryInterfaces';
import { IService, IServiceConstructor } from '../interfaces/serviceInterfaces';
import ServiceHelpers from './serviceHelpers';

class UserService implements IService<UserRepository> {
  readonly repository;

  constructor({ repository }: IServiceConstructor<UserRepository>) {
    this.repository = repository;
  }

  public createPartialUser(user: User): PartialUser {
    const partialUser: PartialUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      disabledAt: user.disabledAt,
      disabledBy: user.disabledBy,
    };
    return partialUser;
  }

  public async create(args: ICreateUserArgs): Promise<void> {
    const createUserObjectValidationRule = {
      email: 'required|email|max:50',
      firstName: 'required|max:30',
      lastName: 'required|max:30',
      password: 'required|max:512',
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
    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(plainTextPassword, salt);

    const insertData: ICreateUserArgs = {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      password: hash,
    };

    await this.repository.create(insertData);
  }

  public async findById(id: number): Promise<PartialUser> {
    if (!ServiceHelpers.isValidNumericId(id)) {
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

    return this.createPartialUser(user);
  }
}

export default UserService;
