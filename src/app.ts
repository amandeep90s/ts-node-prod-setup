import express, { Application } from 'express';
import path from 'path';
import globalErrorHandler from './middleware/globalErrorHandler';
import router from './router/apiRouter';

const app: Application = express();

// Middleware
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, '../', 'public')));

// Routes
app.use('/api/v1', router);

// Global error handler
app.use(globalErrorHandler);

export default app;
