import winston from 'winston';
import config from '../config';

const { combine, timestamp, printf, colorize, errors, metadata } =
  winston.format;

const myFormat = printf(({ level, message, timestamp, stack, metadata }) => {
  const meta =
    metadata && Object.keys(metadata).length
      ? ` ${JSON.stringify(metadata)}`
      : '';
  const msg = stack || message;
  return `${timestamp} ${level}: ${msg}${meta}`;
});

const logger = winston.createLogger({
  level: config.node_env === 'development' ? 'debug' : 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize({ all: true }),
    metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    myFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Provide a stream for morgan or other request loggers
export const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export default logger;
