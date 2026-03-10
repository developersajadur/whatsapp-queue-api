import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import status from 'http-status';

import router from './app/routes';
import config from './app/config';
import { appLimiter } from './app/middlewares/appRateLimiter';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import sendResponse from './app/helpers/sendResponse';
import helmet from 'helmet';
import requestLogger from './app/middlewares/requestLogger';

const app: Application = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// request logging (morgan -> winston)
app.use(requestLogger);

app.use(cookieParser());

app.get('/', appLimiter, (req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: `Server is running on port ${config.port}`,
  });
});

app.use('/api/v1', router);

app.use(notFound);

app.use(globalErrorHandler);

export default app;
