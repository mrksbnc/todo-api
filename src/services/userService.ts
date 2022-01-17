'use strict';

import services from '.';
import { User } from '.prisma/client';
import { isValidNumericId } from '../validators';
import PartialUser from '../types/partialUser';
import { CreateUserData } from '../types/createModels';
import { UpdateUserData } from '../types/updateModels';
import UserRepositroy from '../repositories/userRepository';
import ResourceNotFoundError from '../errors/resourceNotFoundError';
import InvalidNumericIdError from '../errors/invalidNumericIdError';
import ResourceAlreadyExistsError from '../errors/resourceAlreadyExistsError';

class UserService {
  private readonly repository: UserRepositroy;

  constructor(repository: UserRepositroy) {
    this.repository = repository;
  }

  public createPartialUser(data: User): PartialUser {
    const partialUser = Object.freeze({
      id: data.id,
      email: data.email,
      lastName: data.lastName,
      firstName: data.firstName,
    }) as PartialUser;

    return partialUser;
  }

  public async create(data: CreateUserData): Promise<void> {
    const user = await this.repository.findByEmail(data.email);
    if (user) throw ResourceAlreadyExistsError;

    const hash = await services.auth.generatePasswordHash(data.password);
    const newUser = Object.freeze({
      password: hash,
      email: data.email,
      lastName: data.lastName,
      firstName: data.firstName,
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

  public async update(id: number, data: UpdateUserData): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const user = await this.repository.findById(id);
    if (!user) throw ResourceNotFoundError;

    if (data.password) {
      const hash = await services.auth.generatePasswordHash(data.password);
      data.password = hash;
    }
    await this.repository.update(id, data);
  }

  public async delete(id: number): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const user = await this.repository.findById(id);
    if (!user) throw ResourceNotFoundError;

    await this.repository.delete(id);
  }
}

export default UserService;
