'use strict';

import { ICreateUserData } from '../data/types/repository';
import UserRepositroy from '../repositories/userRepository';

class UserService {
  private readonly repository: UserRepositroy;

  constructor(repository: UserRepositroy) {
    this.repository = repository;
  }

  public async create(args: ICreateUserData): Promise<void> {}
}

export default UserService;
