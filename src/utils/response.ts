'use strict';

export function isResponseOk(status: number) {
  return status >= 200 && status < 300;
}
