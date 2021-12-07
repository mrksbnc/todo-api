'use strict';

enum ApiErrorMessageEnum {
  BAD_REQUEST = 'Bad request',
  INTERNAL_SERVVER_ERROR = 'Internal server error',
  NOT_FOUND = 'The requested resource was not found',
  SEE_OTHER = 'The requested resource already exists',
  MISSING_AUTH_TOKEN = 'Authentication token missing',
  ROUTE_NOT_FOUND = 'The requested route does not exists',
  INVALID_AUTH_TOKEN = 'Invalid authentication token sent',
  INVALID_NUMERIC_ID = 'Invalid numeric id recived from client',
  UNAUTHORIZED = 'Authentication is required to access the requested resource',
}

export default ApiErrorMessageEnum;
