'use strict';

enum ErrorMessageEnum {
  INTERNAL_SERVVER_ERROR = 'Internal server error',
  MISSING_AUTH_TOKEN = 'Authentication token missing',
  ROUTE_NOT_FOUND = 'The requested path could not be found',
  INVALID_ARGUMENT = 'Invalid argument received from client',
  RESOURCE_NOT_FOUND = 'The requested resource was not found',
  INVALID_NUMERIC_ID = 'Invalid numeric id received from client',
  RESOURCE_ALREADY_EXISTS = 'Resource already exists in database',
  INVALID_AUTH_TOKEN = 'Invalid authentication token received from client',
  UNAUTHORIZED = 'Authentication is required to access the requested resource',
}

export default ErrorMessageEnum;
