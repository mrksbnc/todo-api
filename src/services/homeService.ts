'use strict';

import UserService from './userService';
import PartialUser from '../data/types/partialUser';
import { isValidNumericId } from '../utils/validators';
import UserRepositroy from '../repositories/userRepository';
import InvalidNumericIdError from '../data/errors/invalidNumericIdError';
import ResourceNotFoundError from '../data/errors/resourceNotFoundError';

class HomeService {
  private readonly userRepository: UserRepositroy;
  private readonly userService: UserService;

  constructor({ userRepository, userService }: { userRepository: UserRepositroy; userService: UserService }) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  public async getAppData({ userId }: { userId: number }): Promise<{ user: PartialUser }> {
    if (!isValidNumericId(userId)) throw InvalidNumericIdError;

    const user = await this.userRepository.findById(userId);
    if (!user) throw ResourceNotFoundError;

    const pu = this.userService.createPartialUser(user);
    return { user: pu };
  }
}

export default HomeService;
