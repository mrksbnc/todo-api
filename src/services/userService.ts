'use strict';

import ApiErrorMessageEnum from '../data/constants/apiErrorMessageEnum';
import HttpStatusCodeEnum from '../data/constants/httpStatusCodeEnum';
import GeneralException from '../data/errors/generalException';
import HttpException from '../data/errors/httpException';
import { ICreateUserData } from '../data/types/repository';
import UserRepositroy from '../repositories/userRepository';
import { isEmptyObject } from '../utils/validators';
import { validateUserArgs } from '../validations/serviceValidations';

class UserService {
  private readonly repository: UserRepositroy;

  constructor(repository: UserRepositroy) {
    this.repository = repository;
  }

  public async create(args: ICreateUserData): Promise<void> {
    if (isEmptyObject(args)) {
      throw new GeneralException({
        message: 'Empty object sent from the client',
        httpException: new HttpException({
          message: ApiErrorMessageEnum.BAD_REQUEST,
          status: HttpStatusCodeEnum.BAD_REQUEST,
        }),
      });
    }

    const { isValid, validationErrors } = validateUserArgs(args);
    if (!isValid) {
      throw new GeneralException({
        message: 'Create user args validation failed! errors: ' + validationErrors.join('\n'),
        httpException: new HttpException({
          message: ApiErrorMessageEnum.BAD_REQUEST,
          status: HttpStatusCodeEnum.BAD_REQUEST,
        }),
      });
    }

    await this.repository.create(args);
  }
}

export default UserService;
