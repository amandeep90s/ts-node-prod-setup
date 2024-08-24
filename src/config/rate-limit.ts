import { Connection } from 'mongoose';
import { RateLimiterMongo } from 'rate-limiter-flexible';

let internalRateLimiterMongo: null | RateLimiterMongo = null;

export const getRateLimiterMongo = (): null | RateLimiterMongo => internalRateLimiterMongo;

export const initRateLimiter = (mongooseConnection: Connection) => {
  internalRateLimiterMongo = new RateLimiterMongo({
    storeClient: mongooseConnection,
    points: 10, // Number of requests
    duration: 60 // Per 60 seconds by IP
  });
};
