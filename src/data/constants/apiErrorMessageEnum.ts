'use strict';

enum ApiErrorMessageEnum {
  BAD_REQUEST = 'Bad request',
  INTERNAL_SERVVER_ERROR = 'Internal server error',
  NOT_FOUND = 'The requested resource was not found',
  SEE_OTHER = 'The requested resource already exists',
  UNAUTHORIZED = 'Authentication is required to access the requested resource',

  INVALID_ARGUMENT = 'Invalid argument received from client',
  INVALID_NUMERIC_ID = 'Invalid numeric id received from client',
  INVALID_AUTH_TOKEN = 'Invalid authentication token received from client',

  RESOURCE_NOT_FOUND = 'The requested resource was not found',
  ROUTE_NOT_FOUND = 'The requested API endpoint does not exists',

  MISSING_AUTH_TOKEN = 'Authentication token missing',

  RESOURCE_ALREADY_EXISTS = 'Resource already exists in database',
}

export default ApiErrorMessageEnum;
