'use strict';

import bcrypt from 'bcrypt';
import { User } from '.prisma/client';
import { createToken } from '../utils/token';
import PartialUser from '../data/types/partialUser';
import { isValidNumericId } from '../utils/validators';
import HttpException from '../data/errors/httpException';
import UserRepositroy from '../repositories/userRepository';
import GeneralException from '../data/errors/generalException';
import HttpStatusCodeEnum from '../data/constants/httpStatusCodeEnum';
import ApiErrorMessageEnum from '../data/constants/apiErrorMessageEnum';
import { ICreateUserData, IUpdateUserData } from '../data/types/repository';
import services from '.';

class UserService {
  private readonly repository: UserRepositroy;

  constructor(repository: UserRepositroy) {
    this.repository = repository;
  }

  public createPartialUser(args: User): PartialUser {
    const partialUser = Object.freeze({
      id: args.id,
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
    }) as PartialUser;

    return partialUser;
  }

  public async create(args: ICreateUserData): Promise<void> {
    const user = await this.repository.findByEmail(args.email);
    if (user) {
      throw new GeneralException({
        message: 'user already exists whit the following email ' + args.email + ' in the database',
        httpException: new HttpException({
          message: ApiErrorMessageEnum.EMAIL_FOUND,
          status: HttpStatusCodeEnum.BAD_REQUEST,
        }),
      });
    }

    const hash = await services.auth.generatePasswordHash(args.password);

    const newUser = Object.freeze({
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      password: hash,
    }) as User;

    await this.repository.create(newUser);
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new GeneralException({
        message: `user with email '${email}' could not be found in database`,
        httpException: new HttpException({
          message: ApiErrorMessageEnum.EMAIL_NOT_FOUND,
          status: HttpStatusCodeEnum.NOT_FOUND,
        }),
      });
    }

    return user;
  }

  public async getPartialUserById(id: number): Promise<PartialUser> {
    if (!isValidNumericId(id)) {
      throw new GeneralException({
        message: `invalid numeric id '${id}' recived from client`,
        httpException: new HttpException({
          message: ApiErrorMessageEnum.INVALID_NUMERIC_ID,
          status: HttpStatusCodeEnum.BAD_REQUEST,
        }),
      });
    }

    const user = await this.repository.findById(id);
    if (!user) {
      throw new GeneralException({
        message: `user with id '${id}' could not be found in database`,
        httpException: new HttpException({
          message: ApiErrorMessageEnum.NOT_FOUND,
          status: HttpStatusCodeEnum.NOT_FOUND,
        }),
      });
    }

    const partialUser = this.createPartialUser(user);
    return partialUser;
  }

  public async getPartialUserByEmail(email: string): Promise<PartialUser> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new GeneralException({
        message: `user with email '${email}' could not be found in database`,
        httpException: new HttpException({
          message: ApiErrorMessageEnum.EMAIL_NOT_FOUND,
          status: HttpStatusCodeEnum.NOT_FOUND,
        }),
      });
    }

    const partialUser = this.createPartialUser(user);
    return partialUser;
  }

  public async update(id: number, args: IUpdateUserData): Promise<void> {
    if (!isValidNumericId(id)) {
      throw new GeneralException({
        message: `invalid numeric id '${id}' recived from client`,
        httpException: new HttpException({
          message: ApiErrorMessageEnum.INVALID_NUMERIC_ID,
          status: HttpStatusCodeEnum.BAD_REQUEST,
        }),
      });
    }

    if (args.password) {
      const hash = await services.auth.generatePasswordHash(args.password);
      args.password = hash;
    }

    await this.repository.update(id, args);
  }

  public async delete(id: number): Promise<void> {
    if (!isValidNumericId(id)) {
      throw new GeneralException({
        message: `invalid numeric id '${id}' recived from client`,
        httpException: new HttpException({
          message: ApiErrorMessageEnum.INVALID_NUMERIC_ID,
          status: HttpStatusCodeEnum.BAD_REQUEST,
        }),
      });
    }

    await this.repository.delete(id);
  }
}

export default UserService;
