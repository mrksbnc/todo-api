'use strict';

import fs from 'fs';
import path from 'path';
import bunyan from 'bunyan';
import config from '../config/config';

const pretty = require('@mechanicalhuman/bunyan-pretty');

const logDirPath = path.resolve(__dirname, '..', 'logs');

if (!fs.existsSync(logDirPath)) {
  fs.mkdirSync(logDirPath);
}

const logger = bunyan.createLogger({
  name: config.app.name,
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: 'info',
      stream: config.app.isProd ? undefined : pretty(process.stdout, { timeStamps: false }),
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
