import rateLimit from 'express-rate-limit';
import type { Request, Response } from 'express';
import config from '../config';
import status from 'http-status';

export const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,

  standardHeaders: true,
  legacyHeaders: false,

  handler: (req: Request, res: Response) => {
    return res.status(status.TOO_MANY_REQUESTS).json({
      success: false,
      statusCode: status.TOO_MANY_REQUESTS,
      message: 'Too many requests from this IP. Please try again later.',
    });
  },
});
