'use strict';

enum ApiErrorMessageEnum {
  /** H T T P  C O D E S */
  BAD_REQUEST = 'Bad request',
  INTERNAL_SERVVER_ERROR = 'Internal server error',
  NOT_FOUND = 'The requested resource was not found',
  SEE_OTHER = 'The requested resource already exists',
  UNAUTHORIZED = 'Authentication is required to access the requested resource',
  /** I N V A L I D  D A T A */
  INVALID_PASSWORD = 'Invalid password received from client',
  INVALID_NUMERIC_ID = 'Invalid numeric id received from client',
  INVALID_AUTH_TOKEN = 'Invalid authentication token received from client',
  /** N O T  F O U N D */
  ROUTE_NOT_FOUND = 'The requested API endpoint does not exists',
  USER_NOT_FOUND = 'Id recived from client was not found in database',
  EMAIL_NOT_FOUND = 'E-mail received from client was not found in database',
  /** M I S S I N G */
  MISSING_AUTH_TOKEN = 'Authentication token missing',
  /** D U P L I C A T E */
  EMAIL_FOUND = 'E-mail received from client is already in database',
}

export default ApiErrorMessageEnum;
