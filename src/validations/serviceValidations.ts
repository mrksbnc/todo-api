'use strict';

import assert from 'assert';
import { ICreateUserData } from '../data/types/repository';

export const validateCreateUserArgs = function (args: ICreateUserData): boolean {
  let isValid = true;
  const validationErrors: string[] = [];

  if (!args.email) {
    validationErrors.push('E-mail is required');
    isValid = false;
  }

  if (args.email) {
    if (typeof args.email !== 'string') {
      validationErrors.push('E-mail must be a string');
      isValid = false;
    }

    const regexTestResult = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    ).test(args.email);

    if (!regexTestResult) {
      validationErrors.push('E-mail is not in valid format');
      isValid = false;
    }

    if (args.email.length > 64) {
      validationErrors.push('E-mail cannot be longer than 64 character');
      isValid = false;
    }
  }

  if (!args.firstName) {
    validationErrors.push('Firstname is required');
    isValid = false;
  }

  if (args.firstName) {
    if (typeof args.firstName !== 'string') {
      validationErrors.push('Firstname must be a string');
      isValid = false;
    }

    if (args.firstName.length > 32) {
      validationErrors.push('Firstname cannot be longer than 32 character');
      isValid = false;
    }
  }

  if (!args.lastName) {
    validationErrors.push('LastName is required');
    isValid = false;
  }

  if (args.lastName) {
    if (typeof args.lastName !== 'string') {
      validationErrors.push('LastName must be a string');
      isValid = false;
    }

    if (args.lastName.length > 32) {
      validationErrors.push('LastName cannot be longer than 32 character');
      isValid = false;
    }
  }

  if (!args.password) {
    validationErrors.push('Password is required');
    isValid = false;
  }

  if (args.password) {
    if (typeof args.password !== 'string') {
      validationErrors.push('Password must be a string');
      isValid = false;
    }

    if (new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(args.password)) {
      validationErrors.push('Password must contains mimimum 8 character one uppercase a lowercase letter and a number');
      isValid = false;
    }
  }

  return isValid;
};
