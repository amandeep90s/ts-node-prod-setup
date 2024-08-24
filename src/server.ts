import app from './app';
import config from './config/config';
import { initRateLimiter } from './config/rate-limit';
import databaseService from './service/databaseService';
import logger from './util/logger';

const server = app.listen(config.PORT);

(async () => {
  try {
    // Database connection
    const connection = await databaseService.config();
    logger.info('DATABASE_CONNECTION', { meta: { CONNECTION_NAME: connection.name } });

    initRateLimiter(connection);
    logger.info('RATE_LIMITER_INITIALIZED');
    logger.info('APPLICATION_STARTED', { meta: { PORT: config.PORT, SERVER_URL: config.SERVER_URL } });
  } catch (error) {
    logger.error('APPLICATION_ERROR', { meta: { error } });

    server.close((err) => {
      if (err) {
        logger.error('SERVER_ERROR', { meta: { error: err } });
      }
      process.exit(1);
    });
  }
})().catch((error: unknown) => {
  logger.error('UNHANDLED_ERROR', { meta: { error } });
});
