'use strict';

import services from '.';
import { User } from '.prisma/client';
import PartialUser from '../data/types/partialUser';
import { isValidNumericId } from '../utils/validators';
import HttpException from '../data/exceptions/httpException';
import UserRepositroy from '../repositories/userRepository';
import HttpStatusCodeEnum from '../data/constants/httpStatusCodeEnum';
import ApiErrorMessageEnum from '../data/constants/apiErrorMessageEnum';
import ResourceNotFoundError from '../data/errors/resourceNotFoundError';
import InvalidNumericIdError from '../data/errors/invalidNumericIdError';
import { ICreateUserData, IUpdateUserData } from '../data/types/repository';
import ResourceAlreadyExistsError from '../data/errors/resourceAlreadyExistsError';

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
      throw ResourceAlreadyExistsError;
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
      throw ResourceNotFoundError;
    }
    return user;
  }

  public async getPartialUserById(id: number): Promise<PartialUser> {
    if (!isValidNumericId(id)) {
      throw InvalidNumericIdError;
    }

    const user = await this.repository.findById(id);
    if (!user) {
      throw new HttpException({
        message: ApiErrorMessageEnum.RESOURCE_NOT_FOUND,
        status: HttpStatusCodeEnum.NOT_FOUND,
      });
    }

    const partialUser = this.createPartialUser(user);
    return partialUser;
  }

  public async getPartialUserByEmail(email: string): Promise<PartialUser> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw ResourceNotFoundError;
    }

    const partialUser = this.createPartialUser(user);
    return partialUser;
  }

  public async update(id: number, args: IUpdateUserData): Promise<void> {
    if (!isValidNumericId(id)) {
      throw InvalidNumericIdError;
    }

    if (args.password) {
      const hash = await services.auth.generatePasswordHash(args.password);
      args.password = hash;
    }
    await this.repository.update(id, args);
  }

  public async delete(id: number): Promise<void> {
    if (!isValidNumericId(id)) {
      throw InvalidNumericIdError;
    }
    await this.repository.delete(id);
  }
}

export default UserService;
