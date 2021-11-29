'use strict';

import bcrypt from 'bcrypt';
import UserRepository from '../repositories/userRepository';
import { IService, IServiceConstructor } from '../interfaces/serviceInterfaces';

class UserService implements IService<UserRepository> {
  readonly repository;

  constructor({ repository }: IServiceConstructor<UserRepository>) {
    this.repository = repository;
  }
}

export default UserService;
