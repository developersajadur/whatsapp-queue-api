/* eslint-disable @typescript-eslint/no-explicit-any */
import morgan from 'morgan';
import { stream } from '../utils/logger';
import config from '../config';

// token to log request body (useful for non-GET requests)
morgan.token('body', (req: any) => {
  try {
    return JSON.stringify(req.body) === '{}' ? '' : JSON.stringify(req.body);
  } catch (e) {
    return '';
  }
});

const morganFormat =
  ':remote-addr - :method :url :status :res[content-length] - :response-time ms :body';

const requestLogger = morgan(morganFormat, {
  stream,
  skip: () => config.node_env === 'test',
});

export default requestLogger;
