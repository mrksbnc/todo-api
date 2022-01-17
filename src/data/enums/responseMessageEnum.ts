'use strict';

enum ResponseMessageEnum {
  OK = 'OK',
  CREATED = 'Resource created successfully',
  UPDATED = 'Resource updated successfully',
  DELETED = 'Resource deleted successfully',
  CREATED_MANY = 'Resources created successfully',
  UPDATED_MANY = 'Resources updated successfully',
  DELETED_MANY = 'Resources deleted successfully',
}

export default ResponseMessageEnum;
