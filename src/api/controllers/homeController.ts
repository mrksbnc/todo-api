'use strict';

import { GetAppDataDTO } from '../../types/dto';
import { isResponseOk } from '../../utils/response';
import UserService from '../../services/userService';
import BaseResponse from '../../data/models/baseResponse';
import { param, validationResult } from 'express-validator';
import { NextFunction, Request, Response, Router } from 'express';
import InvalidArgumentError from '../../errors/invalidArgumentError';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';
import ResponseMessageEnum from '../../data/enums/responseMessageEnum';

class HomeController {
  public readonly router: Router;
  private readonly path = '/home';
  protected readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    this.router = Router();
    this.initializeRoutes();
  }

  private readonly getAppData = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) next(InvalidArgumentError);

      const id = Number(request.params.id);
      const pu = await this.userService.getPartialUserById(id);

      response.status(HttpStatusCodeEnum.OK).json(
        new BaseResponse<GetAppDataDTO>({
          dto: { user: pu },
          status: HttpStatusCodeEnum.OK,
          message: ResponseMessageEnum.OK,
          isOk: isResponseOk(HttpStatusCodeEnum.OK),
        }),
      );
    } catch (error) {
      next(error);
    }
  };

  private initializeRoutes() {
    this.router.get(this.path + '/get/data/:id', param('id').exists().toInt().isNumeric(), this.getAppData);
  }
}

export default HomeController;
