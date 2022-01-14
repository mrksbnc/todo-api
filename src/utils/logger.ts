'use strict';

import fs from 'fs';
import bunyan from 'bunyan';
import baseConfig from '../config/baseConfig';

/* eslint @typescript-eslint/no-var-requires: "off" */
const pretty = require('@mechanicalhuman/bunyan-pretty');
const logDirPath = baseConfig.log.log_dir_path;

if (!fs.existsSync(logDirPath)) {
  fs.mkdirSync(logDirPath);
}

const logger = bunyan.createLogger({
  level: 'debug',
  name: baseConfig.app_name,
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: 'info',
      stream: pretty(process.stdout, { timeStamps: true }),
    },
    {
      level: 'info',
      type: 'rotating-file',
      period: baseConfig.log.log_period,
      path: baseConfig.log.info_log_path,
      count: baseConfig.log.max_log_file_count,
    },
    {
      level: 'error',
      type: 'rotating-file',
      period: baseConfig.log.log_period,
      path: baseConfig.log.error_log_path,
      count: baseConfig.log.max_log_file_count,
    },
  ],
});

export default logger;
