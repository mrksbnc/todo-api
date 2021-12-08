'use strict';

import services from '.';
import { User } from '.prisma/client';
import PartialUser from '../data/types/partialUser';
import { isValidNumericId } from '../utils/validators';
import UserRepositroy from '../repositories/userRepository';
import ResourceNotFoundError from '../data/errors/resourceNotFoundError';
import InvalidNumericIdError from '../data/errors/invalidNumericIdError';
import { ICreateUserData, IUpdateUserData } from '../data/types/repository';
import ResourceAlreadyExistsError from '../data/errors/resourceAlreadyExistsError';

class UserService {
  private readonly repository: UserRepositroy;

  constructor(repository: UserRepositroy) {
    this.repository = repository;
  }

  public createPartialUser(data: User): PartialUser {
    const partialUser = Object.freeze({
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    }) as PartialUser;

    return partialUser;
  }

  public async create(data: ICreateUserData): Promise<void> {
    const user = await this.repository.findByEmail(data.email);
    if (user) throw ResourceAlreadyExistsError;

    const hash = await services.auth.generatePasswordHash(data.password);
    const newUser = Object.freeze({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hash,
    }) as User;

    await this.repository.create(newUser);
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw ResourceNotFoundError;

    return user;
  }

  public async getPartialUserById(id: number): Promise<PartialUser> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const user = await this.repository.findById(id);
    if (!user) throw ResourceNotFoundError;

    const partialUser = this.createPartialUser(user);
    return partialUser;
  }

  public async getPartialUserByEmail(email: string): Promise<PartialUser> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw ResourceNotFoundError;

    const partialUser = this.createPartialUser(user);
    return partialUser;
  }

  public async update(id: number, data: IUpdateUserData): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;
    if (data.password) {
      const hash = await services.auth.generatePasswordHash(data.password);
      data.password = hash;
    }
    await this.repository.update(id, data);
  }

  public async delete(id: number): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;
    await this.repository.delete(id);
  }
}

export default UserService;
