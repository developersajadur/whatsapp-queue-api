import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../globalTypes/error.type';
import config from '../config';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import logger from '../utils/logger';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  // Log full error with request context
  logger.error(message, {
    statusCode,
    error: err,
    stack: err?.stack,
    method: req.method,
    url: req.originalUrl,
    params: req.params,
    query: req.query,
    body: req.body,
    ip: req.ip,
  });

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorSources,
    err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
