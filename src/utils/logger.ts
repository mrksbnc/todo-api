'use strict';

import bunyan from 'bunyan';
import config from '../config/appConfig';

const logger = bunyan.createLogger({ name: config.app.name, level: 'info' });
export default logger;
