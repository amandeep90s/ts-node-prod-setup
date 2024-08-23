import app from './app';
import config from './config/config';
import databaseService from './service/databaseService';
import logger from './util/logger';

const server = app.listen(config.PORT);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  try {
    // Database connection
    const connection = await databaseService.config();
    logger.info('DATABASE_CONNECTION', { meta: { CONNECTION_NAME: connection.name } });
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
})();
