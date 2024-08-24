import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import path from 'path';
import config from './config/config';
import responseMessage from './constant/responseMessage';
import globalErrorHandler from './middleware/globalErrorHandler';
import router from './router/apiRouter';
import httpError from './util/httpError';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: [config.SERVER_URL as string],
    credentials: true
  })
);
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, '../', 'public')));

// Routes
app.use('/api/v1', router);

// 404 handler
app.use('*', (req: Request, _res: Response, next: NextFunction) => {
  const error = new Error(responseMessage.NOT_FOUND('route'));
  httpError(next, error, req, 404);
});

// Global error handler
app.use(globalErrorHandler);

export default app;
