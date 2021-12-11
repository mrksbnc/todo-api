'use strict';

import services from '.';
import cache from '../utils/cache';
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
      lastName: data.lastName,
      firstName: data.firstName,
    }) as PartialUser;

    return partialUser;
  }

  public async create(data: ICreateUserData): Promise<void> {
    const user = await this.repository.findByEmail(data.email);
    if (user) throw ResourceAlreadyExistsError;

    const hash = await services.auth.generatePasswordHash(data.password);
    const newUser = Object.freeze({
      password: hash,
      email: data.email,
      lastName: data.lastName,
      firstName: data.firstName,
    }) as User;

    const actionResult = await this.repository.create(newUser);

    let key = cache.createKey('user', actionResult.id);
    cache.set<PartialUser>(key, this.createPartialUser(actionResult));

    key = cache.createKey('user', actionResult.email);
    cache.set<PartialUser>(key, this.createPartialUser(actionResult));
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw ResourceNotFoundError;

    return user;
  }

  public async getPartialUserById(id: number): Promise<PartialUser> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const key = cache.createKey('user', id);
    const has = cache.has(key);
    if (has) {
      const user = cache.get<PartialUser>(key);
      if (user) return user;
    }

    const user = await this.repository.findById(id);
    if (!user) throw ResourceNotFoundError;

    const partialUser = this.createPartialUser(user);
    cache.set<PartialUser>(key, partialUser);

    return partialUser;
  }

  public async getPartialUserByEmail(email: string): Promise<PartialUser> {
    const key = cache.createKey('user', email);
    const has = cache.has(key);

    if (has) {
      const partialUser = cache.get<PartialUser>(key);
      if (partialUser) return partialUser;
    }

    const user = await this.repository.findByEmail(email);
    if (!user) throw ResourceNotFoundError;

    const partialUser = this.createPartialUser(user);
    cache.set(key, user);

    return partialUser;
  }

  public async update(id: number, data: IUpdateUserData): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const user = await this.repository.findById(id);
    if (!user) throw ResourceNotFoundError;

    const keyWithId = cache.createKey('user', id);
    const keyWithEmail = cache.createKey('user', user.email);
    cache.mDel([keyWithId, keyWithEmail]);

    if (data.password) {
      const hash = await services.auth.generatePasswordHash(data.password);
      data.password = hash;
    }
    const actionResult = await this.repository.update(id, data);
    cache.set<PartialUser>(keyWithId, this.createPartialUser(actionResult));
    cache.set<PartialUser>(keyWithEmail, this.createPartialUser(actionResult));
  }

  public async delete(id: number): Promise<void> {
    if (!isValidNumericId(id)) throw InvalidNumericIdError;

    const user = await this.repository.findById(id);
    if (!user) throw ResourceNotFoundError;

    await this.repository.delete(id);

    const keyWithId = cache.createKey('user', id);
    const keyWithEmail = cache.createKey('user', user.email);
    cache.mDel([keyWithId, keyWithEmail]);
  }
}

export default UserService;
