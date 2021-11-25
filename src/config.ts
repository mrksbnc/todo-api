'use strict';

import dotenv from 'dotenv';

class Config {
  public static get() {
    dotenv.config({ path: './.env' });

    const port = Number(process.env.PORT);
    const appName = process.env.APP_NAME || 'todo api';
    const nodeEnv = process.env.NODE_ENV || 'development';

    return {
      port,
      nodeEnv,
      appName,
    };
  }
}

export default Config;
