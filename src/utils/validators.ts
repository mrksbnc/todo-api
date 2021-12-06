'use strict';

export const isValidNumericId = (id: number): boolean => {
  return !isNaN(id) && id > 0;
};

export const isObjectEmpty = <T>(obj: T): boolean => {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};
