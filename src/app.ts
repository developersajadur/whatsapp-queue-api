import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import status from 'http-status';

import router from './app/routes';
import config from './app/config';
import { appLimiter } from './app/middlewares/rateLimiter';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(appLimiter);

app.get('/', (req: Request, res: Response) => {
  res.status(status.OK).json({
    success: true,
    message: `Server is running on port ${config.port}`,
  });
});

app.use('/api/v1', router);

app.use(notFound);

app.use(globalErrorHandler);

export default app;
