'use strict';

import jwt from 'jsonwebtoken';
import { User } from '.prisma/client';
import config from '../../config/config';
import repositories from '../../repositories';
import { NextFunction, Response } from 'express';
import { isValidNumericId } from '../../helpers/validators';
import HttpException from '../../data/exceptions/HttpException';
import { DataStoredInToken } from '../../data/interfaces/token';
import ApiErrorMessageEnum from '../../data/enums/apiErrorMessages';
import HttpStatusCodeEnum from '../../data/enums/httpStatusCodeEnum';
import IExtendedRequest from '../../data/interfaces/request';

const authMiddleware = async (request: IExtendedRequest, response: Response, next: NextFunction) => {
  try {
    const authorization: string =
      request.cookies['Authorization'] || request.header('Authorization')?.split('Bearer ')[1] || '';

    if (!authorization) {
      next(
        new HttpException({
          message: ApiErrorMessageEnum.INVALID_AUTH_TOKEN,
          statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
        }),
      );
    }

    const secretKey: string = config.auth.secretKey;
    const verificationResponse = (await jwt.verify(authorization, secretKey)) as DataStoredInToken;
    const userId = verificationResponse.id;

    if (!isValidNumericId(userId)) {
      next(
        new HttpException({
          message: ApiErrorMessageEnum.BAD_REQUEST,
          statusCode: HttpStatusCodeEnum.BAD_REQUEST,
        }),
      );
    }

    const queryResult = await repositories.user.findById(userId);
    if (!queryResult) {
      next(
        new HttpException({
          message: ApiErrorMessageEnum.BAD_REQUEST,
          statusCode: HttpStatusCodeEnum.BAD_REQUEST,
        }),
      );
    }

    request.userId = Number(queryResult?.id);
    request.partialUser = repositories.user.createPartialUser(queryResult as User);

    next();
  } catch (error) {
    next(
      new HttpException({
        message: ApiErrorMessageEnum.UNAUTHORIZED,
        statusCode: HttpStatusCodeEnum.UNAUTHORIZED,
      }),
    );
  }
};

export default authMiddleware;
