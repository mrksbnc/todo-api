'use strict';

export const isValidNumericId = (id: number): boolean => {
  return !isNaN(id) && !isNaN(id % 1) && id % 1 == 0 && id > 0;
};

export const isEmptyObject = <T>(obj: T): boolean => {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};

export function isEmptyString(str: string) {
  return str.trim() === '' || !str.trim();
}
