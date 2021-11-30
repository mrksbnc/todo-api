'use strict';

import logger from '../../utils/logger';
import morgan, { StreamOptions } from 'morgan';

const stream: StreamOptions = { write: (message) => logger.info(message.slice(0, message.length - 1)) };

const httpTrafficLogMiddleware = morgan(':method :url :status :response-time ms', {
  stream,
});

export default httpTrafficLogMiddleware;
