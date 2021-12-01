'use strict';

enum ApiErrorMessageEnum {
  BAD_REQUEST = 'Bad request',
  NOT_FOUND = 'The requested resource was not found',
  SEE_OTHER = 'The requested resource already exists',
  MISSING_AUTH_TOKEN = 'Authentication token missing',
  INVALID_AUTH_TOKEN = 'Invalid authentication token sent',
  UNAUTHORIZED = 'Authentication is required to access the requested resource',
  INTERNAL_SERVVER_ERROR = 'Internal server error',
}

export default ApiErrorMessageEnum;
