'use strict';

import fs from 'fs';
import bunyan from 'bunyan';
import config from '../config';

/* eslint @typescript-eslint/no-var-requires: "off" */
const pretty = require('@mechanicalhuman/bunyan-pretty');
const logDirPath = config.log.log_dir_path;

if (!fs.existsSync(logDirPath)) {
  fs.mkdirSync(logDirPath);
}

const logger = bunyan.createLogger({
  level: 'debug',
  name: config.app_id,
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: 'info',
      stream: pretty(process.stdout, { timeStamps: true }),
    },
    {
      level: 'info',
      type: 'rotating-file',
      period: config.log.period,
      path: config.log.info_log_path,
      count: config.log.max_log_file_count,
    },
    {
      level: 'error',
      type: 'rotating-file',
      period: config.log.period,
      path: config.log.error_log_path,
      count: config.log.max_log_file_count,
    },
  ],
});

export default logger;
