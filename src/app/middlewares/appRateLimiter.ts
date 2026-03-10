import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import status from 'http-status';

export const appLimiter = rateLimit({
  windowMs: 1 * 1000, // 10 seconds
  max: 10, // max 8 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(status.TOO_MANY_REQUESTS).json({
      success: false,
      statusCode: status.TOO_MANY_REQUESTS,
      message: 'Too many requests from this IP. Please try again later.',
    });
  },
});
