'use strict';

import services from '.';
import bcrypt from 'bcrypt';
import config from '../config';
import { createToken } from '../utils/token';
import PartialUser from '../data/types/partialUser';
import HttpException from '../data/errors/httpException';
import UserRepositroy from '../repositories/userRepository';
import HttpStatusCodeEnum from '../data/constants/httpStatusCodeEnum';
import ApiErrorMessageEnum from '../data/constants/apiErrorMessageEnum';

class AuthService {
  private readonly repository: UserRepositroy;

  constructor(repository: UserRepositroy) {
    this.repository = repository;
  }

  public async generatePasswordHash(plainTextPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(config.auth.salt_rounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);
    return hash;
  }

  public async comparePasswordWithHash(plainTextPassword: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainTextPassword, hash);
    return isMatch;
  }

  public async login(email: string, password: string): Promise<{ token: string; user: PartialUser }> {
    const user = await services.user.getUserByEmail(email);
    if (!user) {
      throw new HttpException({
        message: ApiErrorMessageEnum.RESOURCE_NOT_FOUND,
        status: HttpStatusCodeEnum.NOT_FOUND,
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new HttpException({
        message: ApiErrorMessageEnum.BAD_REQUEST,
        status: HttpStatusCodeEnum.BAD_REQUEST,
      });
    }

    const jwtPayload = { userId: user.id, name: `${user.firstName} ${user.lastName}` };
    const token = createToken(jwtPayload);
    const partialUser = services.user.createPartialUser(user);

    return {
      token,
      user: partialUser,
    };
  }
}

export default AuthService;
