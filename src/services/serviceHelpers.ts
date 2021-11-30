'use strict';

abstract class ServiceHelpers {
  public static isValidNumericId(id: number): boolean {
    return !isNaN(id) && id > 0;
  }
}
export default ServiceHelpers;
