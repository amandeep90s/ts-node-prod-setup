import mongoose from 'mongoose';
import config from '../config/config';
import logger from '../util/logger';

export default {
  config: async () => {
    try {
      if (!config.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined');
      }
      await mongoose.connect(config.DATABASE_URL);
      return mongoose.connection;
    } catch (error) {
      logger.error('DATABASE_ERROR', { meta: { error } });
      throw new Error('Error connecting to database');
    }
  }
};
