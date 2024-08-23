import app from './app';
import config from './config/config';
import logger from './util/logger';

const server = app.listen(config.PORT);

(() => {
  try {
    // Database connection
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
