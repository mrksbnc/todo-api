'use strict';

enum ErrorNameEnum {
  TOKEN_NOT_FOUND = 'TokenNotFoundError',
  ROUTE_NOT_FOUND = 'RouteNotFoundError',
  INVALID_DELEGATE = 'InvalidDelegateError',
  INVALID_ARGUMENT = 'InvalidArgumentError',
  RESOURCE_NOT_FOUND = 'ResourceNotFoundError',
  INVALID_NUMERIC_ID = 'InvalidNumericIdError',
  INVALID_AUTH_TOKEN = 'InvalidAuthTokenError',
  RESOURCE_ALREADY_EXISTS = 'ResourceAlreadyExistsError',
}

export default ErrorNameEnum;
