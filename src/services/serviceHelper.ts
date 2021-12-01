'use strict';

abstract class ServiceHelper {
  public isValidNumericId(id: number): boolean {
    return !isNaN(id) && id > 0;
  }

  public isObjectEmpty(obj: Record<string | number, unknown>): boolean {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
  }
}

export default ServiceHelper;
