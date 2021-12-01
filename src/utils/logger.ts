'use strict';

import fs from 'fs';
import bunyan from 'bunyan';
import config from '../config/config';

/* eslint @typescript-eslint/no-var-requires: "off" */
const pretty = require('@mechanicalhuman/bunyan-pretty');
const logDirPath = config.log.logDirPath;

if (!fs.existsSync(logDirPath)) {
  fs.mkdirSync(logDirPath);
}

const logger = bunyan.createLogger({
  level: 'debug',
  name: config.app.name,
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: 'info',
      stream: pretty(process.stdout, { timeStamps: false }),
    },
    {
      level: 'info',
      type: 'rotating-file',
      period: config.log.period,
      path: config.log.infoLogPath,
      count: config.log.maxLogcount,
    },
    {
      level: 'error',
      type: 'rotating-file',
      period: config.log.period,
      path: config.log.errorLogPath,
      count: config.log.maxLogcount,
    },
  ],
});

export default logger;
