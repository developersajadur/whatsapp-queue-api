import rateLimit from 'express-rate-limit';
import type { Request, Response } from 'express';
import config from '../config';
import status from 'http-status';

export const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
    handler: (req: Request, res: Response) => {
    return res.status(status.REQUESTED_RANGE_NOT_SATISFIABLE).json({
        success: false,
        statusCode: status.REQUESTED_RANGE_NOT_SATISFIABLE,
        message: 'Too many requests from this IP. Please try again after 30 seconds.',
      });
  },
});
