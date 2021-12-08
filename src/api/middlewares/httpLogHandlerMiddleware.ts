'use strict';

import morgan, { StreamOptions } from 'morgan';
import logger from '../../utils/logger';

const logStream: StreamOptions = { write: (message) => logger.info(message.slice(0, message.length - 1)) };
const httpLogHandlerMiddleware = morgan(':remote-addr :method :url HTTP/:http-version :status - :response-time ms', {
  stream: logStream,
});

export default httpLogHandlerMiddleware;
